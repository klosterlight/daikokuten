import React from "react";
import { withFirebase } from 'components/Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as ROUTES from 'constants/routes';

// Configure FirebaseUI.
let uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	// Redirect to /rooms after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: `${ROUTES.LANDING}`,
	// signInSuccess: (e) => {
	//   console.log(e);
	//   console.log('signed in');
	// }
};

class LogInForm extends React.Component {
	render() {
		uiConfig['signInOptions'] = this.props.firebase.signInOptions;
		return (
			<div>
				<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={this.props.firebase.auth}/>
			</div>
		)
	}
}

const LogIn = withFirebase(LogInForm);
export default LogIn;
