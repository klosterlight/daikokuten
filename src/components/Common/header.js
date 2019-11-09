import React from "react";
import CurrentUser from './session';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { withFirebase } from '../Firebase';
import { withRouter } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import moment from "moment";

const TIME_FORMAT = "hh:mm:ss a";
const ONE_TICK = 1000;

class HeaderForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			displayName: ""
		};
	}
	componentDidMount() {
		const currentUser = CurrentUser();
		if(currentUser) {
			this.setState({
				displayName: currentUser.displayName
			});
		}
		this.props.firebase.serverTime().on('value', (offset) => {
			const offsetVal = offset.val() || 0;
			const currentServerTime = moment() + offsetVal;
			this.currentServerTime = currentServerTime;
			return 0;
		});
	}
	signOut = () => {
		this.props.firebase.signOut();
		this.props.history.push(ROUTES.LOGIN);
	}
	getCurrentTime = () => {
		const currentServerTime = this.currentServerTime + ONE_TICK;
		const momentCurrentServerTime = moment(currentServerTime);
		if(momentCurrentServerTime.isValid()) {
			this.currentServerTime = currentServerTime;
			return moment(currentServerTime).format(TIME_FORMAT);
		} else {
			return "Loading...";
		}
	}
	render() {
		return (
			<Row>
				<span>
					Hola {this.state.displayName}!
				</span>
				<div>
					{this.getCurrentTime()}
				</div>
				<Button onClick={this.signOut}>Salir!</Button>
			</Row>
		)
	}
}

const Header = withRouter(withFirebase(HeaderForm));
export default Header;
