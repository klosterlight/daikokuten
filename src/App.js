import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { LogIn, isUserLoggedIn } from "./components/Common";
import Room, { Rooms } from "./components/Room";
import { withFirebase } from './components/Firebase';
import * as ROUTES from './constants/routes';

class AppForm extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path={ROUTES.LOGIN} component={LogIn} />
          <Route path={ROUTES.ROOM} component={Room} />
          <Route path={ROUTES.ROOMS} component={Rooms} />
          <Route exact path="/" render={() => (
              isUserLoggedIn() ? (
                <Redirect to={ROUTES.ROOMS} />
              ) : (
                <Redirect to={ROUTES.LOGIN} />
              )
            )}
          />
        </Switch>
      </Router>

    );
  }
}

const App = withFirebase(AppForm);
export default App;
