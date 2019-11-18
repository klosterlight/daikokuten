import React from "react";
import { withFirebase } from "components/Firebase";
import { ToCurrency, ToDateFormat, ToTimeFormat, LeftPad } from "utils/utils";
import moment from "moment";

class AuctionTileBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imageUrl: '',
			isClosed: false
		}
	}
	componentDidMount() {
		// Get the downloadURL to display image
		this.props.firebase.getFile(this.props.auction.imageUrl).then((url) => {
			this.setState({
				imageUrl: url
			});
		});

		// Get starting remaining Time
		const startingTime = moment.unix(this.props.auction.startingAt.seconds);
		const startingDiffTime = startingTime.diff(this.props.serverTime);
		let closingTime = moment.unix(this.props.auction.endingAt.seconds);
		const closingDiffTime = closingTime.diff(this.props.serverTime);
		const remainingTime = moment.duration(startingDiffTime).asMilliseconds();
		closingTime = moment.duration(closingDiffTime).asMilliseconds();
		const isClosed = closingTime < 0;
		this.remainingTime = remainingTime;
		this.setState({
			isClosed: isClosed
		});
	}

	displayRemainingTime = () => {
		const remainingTime = this.remainingTime - this.props.tickInterval;
		this.remainingTime = remainingTime;
		if(this.state.isClosed) {
			return "Cerrado";
		} else {

			let secs = parseInt(remainingTime / 1000);
			let hours = parseInt( secs / 3600 );
			secs = secs % 3600;
			let minutes = parseInt( secs / 60 );
			secs = secs % 60;

			return(
				<React.Fragment>
					<div>Comienza en: </div>
					{LeftPad(hours)}:{LeftPad(minutes)}:{LeftPad(secs)}
				</React.Fragment>
			)
		}
	}

	render() {
		return (
			<div className="col-lg-4">
				<div className="blog-one__single">
					<div className="blog-one__image">
						<img width="370" height="263" src={this.state.imageUrl} alt="Limbo" />
						<a href="room.html"><i className="appyn-icon-plus-symbol"></i></a>
					</div>
					<div className="blog-one__content">

						<h3 className="blog-one__title"><a href="room.html">{this.props.auction.title}</a></h3>
						<div className="priceNshit">
							<h4>{ToCurrency(this.props.auction.startingPrice)}</h4>
							<span>
								{this.props.auction.tokens} tokens
								<div>entrar a la subasta</div>
							</span>
						</div>

						<div className="timenshit">
							<div className="fecha">
								<div> {ToDateFormat(this.props.auction.startingAt.seconds)}</div>
								{ToTimeFormat(this.props.auction.startingAt.seconds)} hrs
							</div>
							<div className="falta">
								{this.displayRemainingTime()}
							</div>

						</div>

						<p className="blog-one__text">{this.props.auction.shortDescription}</p>
					</div>
				</div>
			</div>
		)
	}
}

const AuctionTile = withFirebase(AuctionTileBase);
export default AuctionTile;
