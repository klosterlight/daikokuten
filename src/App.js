import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { LogIn, Landing, NotFound } from "./components/Common";
import Room, { Rooms } from "components/Room";
import { withFirebase } from 'components/Firebase';
import * as ROUTES from 'constants/routes';

class AppForm extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path={ROUTES.LOGIN} component={LogIn} />
					<Route path={ROUTES.ROOM} component={Room} />
					<Route path={ROUTES.ROOMS} component={Rooms} />
					<Route exact path={ROUTES.LANDING} component={Landing} />
					<Route path={ROUTES.NOT_FOUND} component={NotFound} />
					<Redirect to={ROUTES.NOT_FOUND} />
				</Switch>
			</Router>

		);
	}
}

const App = withFirebase(AppForm);
export default App;
