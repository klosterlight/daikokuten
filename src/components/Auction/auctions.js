import React from 'react';
import { withFirebase } from 'components/Firebase';
import { Header, Footer } from 'components/Common';
import logo from "assets/images/logo-1-1.png";
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
		this.props.firebase.getViableAuctions().then((querySnapshot) => {
		// this.props.firebase.getAuctions().then((querySnapshot) => {
			let auctions = [];
			querySnapshot.forEach((doc) => {
				auctions.push(doc.data());
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
									<a href="#" className="thm-breadcrumb__link">Inicio</a>
								</li>
								<li className="thm-breadcrumb__item current">
									<a href="#" className="thm-breadcrumb__link">Subastas</a>
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
								<a className="prev" href="#"><i className="fa fa-angle-left"></i></a>
								<a className="active" href="#">01</a>
								<a href="#">02</a>
								<a href="#">03</a>
								<a href="#">04</a>
								<a href="#">05</a>
								<a className="next" href="#"><i className="fa fa-angle-right"></i></a>
							</div>
						</div>
					</section>
					<Footer />
				</div>
				<a href="#" data-target="html" className="scroll-to-target scroll-to-top"><i className="fa fa-angle-up"></i></a>
			</React.Fragment>
		)
	}
}

const Auctions = withFirebase(AuctionsBase);

export default Auctions;
