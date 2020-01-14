import React from "react";
import { withFirebase } from 'components/Firebase';
import { Header, Footer } from 'components/Common';
import { ToCurrency, SecondsToTimeFormat } from "utils/utils";
import moment from "moment";

const ONE_TICK = 1000;

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
			bid: false
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
			this.setState({
				remainingTime: this.state.remainingTime - ONE_TICK
			});
		}, ONE_TICK);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getAuction = () => {
		const id = this.props.match.params.id;

		this.props.firebase.getAuction(id).then((res) => {
			if(res.exists) {
				const auction = res.data();

				const closingTime = moment.unix(auction.endingAt.seconds);
				const closingDiffTime = closingTime.diff(this.state.serverTime);
				const userId = this.props.firebase.getUserId();

				let bought = false;
				let bid = false;

				if(auction.entries.includes(userId)) {
					bought = true;
					if(auction.bids.includes(userId)) {
						bid = true;
					}
				}

				this.setState({
					auction: auction,
					remainingTime: closingDiffTime,
					id: id,
					bought: bought,
					bid: bid
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

	toggleBookmark = () => {
		// TODO: Save User preference on pinned
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
		});
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
											<img width="770" src={this.state.imageUrl} alt="Awesome Image"/>
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
											<h3 className="sidebar__title">Tiempo</h3>
											<div className="countdown mb-1">{SecondsToTimeFormat(this.state.remainingTime)}</div>
											<hr />
											<h3 className="sidebar__title">Precio</h3>
											<div className="price mb-1">{ToCurrency(this.state.auction.startingPrice)}</div>
											{
												this.state.bought ?
												(
													this.state.bid ?
													(
														<div className="comprarBtn disabled">¡Felicidades!</div>
													)
													:
													(
														<div className="comprarBtn" onClick={this.bid}>Subastar</div>
													)
												)
												:
												(
													<div className="comprarBtn" onClick={this.buyEntry}>Comprar</div>
												)
											}

											<div className="chatx mt-4">
												<hr className="mb-3" />
												<div className="comment-one">
													<div className="comment-one__single">
														<div className="comment-one__image">
															<div className="inner-block">

															</div>
														</div>
														<div className="comment-one__content">
															<div className="comment-one__content-top">
																<div className="comment-one__top-left">
																	<h3 className="comment-one__author">Laquanda Bachmeier</h3>
																	<p className="comment-one__date">20 April, 2019
																		<span className="comment-one__date-sep">.</span>
																		4:20 pm</p>
																	<p className="comment-one__text">Lorem Ipsum is simply dummy text of the rinting and typesetting.</p>
																</div>

															</div>
														</div>
													</div>
												</div>
											</div>
											<form action="#" className="reply-form">
												<div className="row">
													<div className="col-lg-12">
														<textarea placeholder="Mensaje" className="reply-form__field"></textarea>
														<button className="reply-form__btn thm-btn smllBtn" type="submit">Enviar</button>
													</div>
												</div>
											</form>
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
