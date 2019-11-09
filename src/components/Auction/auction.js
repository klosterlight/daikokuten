import React from "react";
import { withFirebase } from 'components/Firebase';

class AuctionBase extends React.Component {
	render() {
		return (
			<div>Auction {this.props.match.params.id}</div>
		)
	}
}

const Auction = withFirebase(AuctionBase);

export default Auction;
