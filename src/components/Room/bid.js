import React from "react";
import Button from 'react-bootstrap/Button';
import { withFirebase } from '../Firebase';
import { CurrentUser } from '../Common';

class BidComponent extends React.Component {
	bid = () => {
		// TODO: BID on Auction
		const currentUser = CurrentUser();
		this.props.firebase.bid(this.props.roomId).push({
			uid: currentUser.uid,
			displayName: currentUser.displayName,
			timestamp: this.props.firebase.timeStamp
		}).then(() => {
			console.log('BID');
		});
	}
	render() {
		return(
			<Button disabled={this.props.denyBid} onClick={() => this.bid()}>Subastar!</Button>
		)
	}
}

const Bid = withFirebase(BidComponent);
export default Bid;
