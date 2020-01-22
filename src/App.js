import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { LogIn, Landing, NotFound } from "./components/Common";
import Room, { Rooms } from "components/Room";
import Auctions, { Auction } from "components/Auction";
import Dashboard, { CreateAuction, AdminAuctions, AdminAuction } from "components/Admin";
import { withFirebase } from 'components/Firebase';
import * as ROUTES from 'constants/routes';

class AppForm extends React.Component {
	render() {
		return (
			<Router>
				<Switch>
					<Route path={ROUTES.CREATE_AUCTION} component={CreateAuction} />
					<Route exact path={ROUTES.ADMIN_DASHBOARD} component={Dashboard} />
					<Route path={ROUTES.ADMIN_AUCTIONS} component={AdminAuctions} />
					<Route path={ROUTES.ADMIN_AUCTION} component={AdminAuction} />

					<Route path={ROUTES.ROOM} component={Room} />
					<Route path={ROUTES.ROOMS} component={Rooms} />

					<Route path={ROUTES.AUCTIONS} component={Auctions} />
					<Route path={ROUTES.AUCTION} component={Auction} />

					<Route path={ROUTES.LOGIN} component={LogIn} />
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
