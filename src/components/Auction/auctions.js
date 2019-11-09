import React from 'react';
import { withFirebase } from 'components/Firebase';

class AuctionsBase extends React.Component {
	render() {
		return (
			<div>Auctions</div>
		)
	}
}

const Auctions = withFirebase(AuctionsBase);

export default Auctions;
