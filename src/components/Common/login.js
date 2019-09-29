import React from "react";
import { withFirebase } from '../Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Configure FirebaseUI.
let uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /rooms after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/rooms',
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
