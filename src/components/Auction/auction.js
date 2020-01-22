import React from "react";
import { withFirebase } from 'components/Firebase';
import { Header, Footer, Comments } from 'components/Common';
import { ToCurrency, SecondsToTimeFormat } from "utils/utils";
import moment from "moment";
import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-default.css';

const ONE_TICK = 1000;
const TICK_MONEY_EVERY = 2;
const RUNNING_STATES = {
	"HAS_NOT_STARTED": 0,
	"RUNNING": 1,
	"CLOSED": 2
};

class AuctionBase extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			auction: {
				title: ''
			},
			id: '',
			pinned: false,
			imageURL: '',
			remainingTime: 0,
			serverTime: 0,
			bought: false,
			bid: false,
			canBid: false,
			runningState: RUNNING_STATES["HAS_NOT_STARTED"],
		}

	}

	componentDidMount() {
		// TODO: Add Loading
		if(this.props.match.params.id) {
			this.props.firebase.serverTime().on('value', (offset) => {
				const serverTimeValue = offset.val() || 0;
				const serverTime = moment() + serverTimeValue;

				this.setState({
					serverTime: serverTime
				}, this.getAuction());
			});
		} else {
			alert("Subasta Inválida. Agregar un ID.");
		}

		this.interval = setInterval(() => {
			if(this.state.remainingTime <= 0) {
				const remainingTimeHash = this.getRemainingTime();
				this.setState(remainingTimeHash);
			} else {
				this.setState({
					remainingTime: this.state.remainingTime - ONE_TICK,
					serverTime: this.state.serverTime + ONE_TICK,
				});
			}
		}, ONE_TICK);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getRemainingTime = () => {
		const auction = this.state.auction;
		// Auction has loaded
		if(this.state.auction.startingAt) {
			const openingTime = moment.unix(auction.startingAt.seconds);
			const closingTime = moment.unix(auction.endingAt.seconds);
			const currentTime = this.state.serverTime;

			let remainingTime = 0;
			let response = {};

			if(openingTime - currentTime <= 0)
			{
				remainingTime = closingTime - currentTime;
				if(remainingTime <= 0) {
					// Auction has closed
					response = {
						canBid: false,
						remainingTime: 0,
						runningState: RUNNING_STATES["CLOSED"]
					}
				} else {
					// Auction running
					response = {
						canBid: true,
						remainingTime: closingTime.diff(currentTime),
						runningState: RUNNING_STATES["RUNNING"]
					};
				}
			} else {
				// Auction has not started
				response = {
					canBid: false,
					remainingTime: openingTime.diff(currentTime),
					runningState: RUNNING_STATES["HAS_NOT_STARTED"]
				};
			}

			return response;
		}

		// Auction still not loaded
		return {
			canBid: false,
			remainingTime: 0,
			price: 0
		}
	}

	getAuction = () => {
		const id = this.props.match.params.id;

		this.props.firebase.getAuction(id).then((res) => {
			if(res.exists) {
				const auction = res.data();
				const userId = this.props.firebase.getUserId();
				const remainingTimeHash = this.getRemainingTime();

				let bought = false;
				let bid = false;
				let pinned = false;

				if(auction.bookmarks.includes(userId)) {
					pinned = true;
				}

				if(auction.entries.includes(userId) || auction.tokens === "0") {
					bought = true;

					if(auction.bids.includes(userId)) {
						bid = true;

						// Get the user bid
						this.props.firebase.getUserBid(id).then((response) => {
							response.forEach((doc) => {
								const userBid = doc.data();
								clearInterval(this.interval);
								// Set the bid values
								const closingTime = moment.unix(auction.endingAt.seconds);
								const biddingTime = moment.unix(userBid.bidAt.seconds);
								const remainingTime = closingTime.diff(biddingTime);
								this.setState({
									remainingTime: remainingTime,
								});
							})
						}).catch((err) => {
							console.log(err);
						})
					}
				}

				this.setState({
					auction: auction,
					remainingTime: remainingTimeHash.remainingTime,
					id: id,
					bought: bought,
					bid: bid,
					canBid: remainingTimeHash.canBid,
					pinned: pinned
				});
				// Get the downloadURL to display image
				this.props.firebase.getFile(auction.imageUrl).then((url) => {
					this.setState({
						imageUrl: url
					});
				});
			} else {
				alert(`No se encontro subasta con id ${id}`);
			}
		}).catch((err) => {
			console.log(err);
		});
	}

	getCurrentPrice = () => {
		let currentPrice = 0;
		if(this.state.runningState === RUNNING_STATES["HAS_NOT_STARTED"]) {
			currentPrice = this.state.auction.startingPrice;
		} else if(this.state.runningState === RUNNING_STATES["RUNNING"]) {
			const remainingTimeInSeconds = ((this.state.remainingTime - ONE_TICK) / ONE_TICK).toFixed(0);
			if( remainingTimeInSeconds % TICK_MONEY_EVERY === 0) {
				currentPrice = parseFloat(this.state.auction.endPrice) + (remainingTimeInSeconds * this.state.auction.priceDecreaseRate);
			} else {
				let stoppedTime = parseInt(remainingTimeInSeconds) + parseInt((TICK_MONEY_EVERY - (remainingTimeInSeconds % TICK_MONEY_EVERY)));
				let price = stoppedTime * this.state.auction.priceDecreaseRate;
				currentPrice = parseFloat(this.state.auction.endPrice) + price;
			}
		} else if(this.state.runningState === RUNNING_STATES["CLOSED"]) {
			currentPrice = this.state.auction.endPrice;
		}
		return currentPrice;
	}

	toggleBookmark = () => {
		const auctionId = this.props.match.params.id;
		// Save User bookmark on auction
		if(this.state.pinned) {
			this.props.firebase.removeBookmark(auctionId);
		} else {
			this.props.firebase.addBookmark(auctionId);
		}
		this.setState({
			pinned: !this.state.pinned
		});
	}

	buyEntry = () => {
		this.props.firebase.buyEntry(this.state.id);
		this.setState({
			bought: true
		});
	}

	bid = () => {
		this.props.firebase.bid(this.state.id);
		this.setState({
			bid: true
		}, clearInterval(this.interval));
	}

	getTimeLabel = () => {
		if(this.state.runningState === RUNNING_STATES["RUNNING"])
			return "TIEMPO";
		if(this.state.runningState === RUNNING_STATES["HAS_NOT_STARTED"])
			return "COMIENZA EN";
		if(this.state.runningState === RUNNING_STATES["CLOSED"])
			return "CERRADA";
	}

	render() {
		return (
			<React.Fragment>
				<div className="page-wrapper">
					<Header />
					<section className="inner-banner">
						<div className="container">
							<div className="roomProduct" onClick={this.toggleBookmark}>
								<h2 className="inner-banner__title">{this.state.auction.title}</h2>
								<div className="pinx">
									{
										this.state.pinned ?
										(
											<i className="fa fa-star"></i>
										)
										:
										(
											<i className="fa fa-star-o"></i>
										)
									}
								</div>
							</div>
							<ul className="thm-breadcrumb">
								<li className="thm-breadcrumb__item">
									<a href="/" className="thm-breadcrumb__link">Inicio</a>
								</li>
								<li className="thm-breadcrumb__item">
									<a href="/auctions" className="thm-breadcrumb__link">Subastas</a>
								</li>
								<li className="thm-breadcrumb__item current">
									<button className="thm-breadcrumb__link link-button">Subastar</button>
								</li>
							</ul>
						</div>
					</section>
					<section className="blog-details">
						<div className="container">
							<div className="row">
								<div className="col-lg-8">
									<div className="blog-details__content">
										<div className="blog-details__image">
											<img width="770" src={this.state.imageUrl} alt="Awesome Auction"/>
										</div>

										<div className="flexCol">
											<div className="pinx" onClick={this.toggleBookmark}>
												{
													this.state.pinned ?
													(
														<i className="fa fa-bookmark"></i>
													)
													:
													(
														<i className="fa fa-bookmark-o"></i>
													)
												}
											</div>
											<h3 className="blog-details__title mb-0">
												{this.state.auction.title}</h3>
										</div>
										<div className="blog-details__top mb-4">
											<span className="blog-one__meta">Precio de lista: {ToCurrency(this.state.auction.startingPrice)}</span>
										</div>
										<p className="blog-details__text">{this.state.auction.longDescription}</p>

									</div>
								</div>
								<div className="col-lg-4 strickyx">
									<div className="sidebar ">
										<div className="sidebar__single sidebar__category">
											<h3 className="sidebar__title">{this.getTimeLabel()}</h3>
											<div className="countdown mb-1">{SecondsToTimeFormat(this.state.remainingTime)}</div>
											<hr />
											<h3 className="sidebar__title">Precio</h3>
											<div className="price mb-1"><Odometer value={this.getCurrentPrice()} format="(,ddd)" /></div>
											{
												this.state.bought ?
												(
													this.state.bid ?
													(
														<div className="comprarBtn disabled">¡Felicidades!</div>
													)
													:
													(
														this.state.canBid ?
														(
															<div className="comprarBtn" onClick={this.bid}>Subastar</div>
														)
														:
														(
															<div className="comprarBtn disabled">Subastar</div>
														)
													)
												)
												:
												this.state.runningState === RUNNING_STATES["CLOSED"] ?
												(
													<div className="comprarBtn disabled">Comprar</div>
												)
												:
												(
													<div className="comprarBtn" onClick={this.buyEntry}>Comprar</div>
												)
											}
											<Comments auctionId={this.props.match.params.id} />
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					<Footer />
				</div>
				<button data-target="html" className="scroll-to-target scroll-to-top link-button"><i className="fa fa-angle-up"></i></button>
			</React.Fragment>
		)
	}
}

const Auction = withFirebase(AuctionBase);

export default Auction;
