import React from "react";
import CurrentUser from './session';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { withFirebase } from '../Firebase';
import { withRouter } from "react-router-dom";
import * as ROUTES from '../../constants/routes';

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
  }
  signOut = () => {
    this.props.firebase.signOut();
    this.props.history.push(ROUTES.LOGIN);
    console.log('exiting');
  }
  render() {
    return (
      <Row>
        <span>
          Hola {this.state.displayName}!
        </span>
        <Button onClick={this.signOut}>Salir!</Button>
      </Row>
    )
  }
}

const Header = withRouter(withFirebase(HeaderForm));
export default Header;
