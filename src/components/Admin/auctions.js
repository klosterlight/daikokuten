import React from 'react';
import { withFirebase } from 'components/Firebase';
import { Header, Footer } from 'components/Common';
import AuctionTile from './_auctionTile';
import moment from "moment";

const ONE_TICK = 1000;

class AuctionsBase extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			auctions: [],
			tickTimer: 0,
			serverTime: 0
		};
	}

	componentDidMount() {
		this.props.firebase.serverTime().on('value', (offset) => {
			const serverTimeValue = offset.val() || 0;
			const serverTime = moment() + serverTimeValue;

			this.setState({
				serverTime: serverTime
			}, this.getAuctions());
		});

		this.interval = setInterval(() => {
			this.setState({
				tickTimer: this.state.tickTimer + 1
			});
		}, ONE_TICK);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	getAuctions = () => {
		// TODO: ADD Pagination
		// TODO: ADD Loading
		this.props.firebase.getAuctions().then((querySnapshot) => {
			let auctions = [];
			querySnapshot.forEach((doc) => {
				let auction = doc.data();
				auction.id = doc.id;
				auction.entries = auction.entries || [];
				if(auction.entries.includes(this.props.firebase.getUserId()) || auction.tokens === "0") {
					auction.bought = true;
				} else {
					auction.bought = false;
				}

				auctions.push(auction);
			});
			this.setState({
				auctions: auctions
			});
		});
	}

	renderAuctions = () => {
		return this.state.auctions.map((auction, index) => {
			return <AuctionTile key={index} auction={auction} tickTimer={this.state.tickTimer} tickInterval={ONE_TICK} serverTime={this.state.serverTime} />;
		});
	}

	render() {
		return (
			<React.Fragment>
				<div className="page-wrapper">
					<Header />
					<section className="inner-banner">
						<div className="container">
							<h2 className="inner-banner__title">Subastas</h2>
							<ul className="thm-breadcrumb">
								<li className="thm-breadcrumb__item">
									<a href="/" className="thm-breadcrumb__link">Inicio</a>
								</li>
								<li className="thm-breadcrumb__item">
									<a href="/admin" className="thm-breadcrumb__link">Admin</a>
								</li>
								<li className="thm-breadcrumb__item current">
									<button className="thm-breadcrumb__link link-button">Subastas</button>
								</li>
							</ul>
						</div>
					</section>
					<section className="blog-one blog-page">
						<div className="container">
							<div className="row">
								{this.renderAuctions()}
							</div>
							<div className="blog-post-pagination text-center">
								<button className="link-button prev"><i className="fa fa-angle-left"></i></button>
								<button className="link-button active">01</button>
								<button className="link-button">02</button>
								<button className="link-button">03</button>
								<button className="link-button">04</button>
								<button className="link-button">05</button>
								<button className="link-button next"><i className="fa fa-angle-right"></i></button>
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

const AdminAuctions = withFirebase(AuctionsBase);

export default AdminAuctions;
