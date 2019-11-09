import React from 'react';
import { withRouter } from "react-router-dom";
import { IsUserLoggedIn, SignOut } from 'components/Common';

import logo from "assets/images/logo-1-1.png";

class HeaderBase extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sessionMessage: ''
		}
	}

	componentDidMount = () => {
		let message = '';
		if(IsUserLoggedIn()) {
			message = 'Salir!';
		} else {
			message = 'pre-registro';
		}
		this.setState({
			sessionMessage: message
		});
	}

	sessionAction = () => {
		let message = '';
		if(IsUserLoggedIn()) {
			this.props.firebase.signOut();
			message = 'pre-registro';
			this.setState({
				sessionMessage: message
			});
		} else {
			this.props.history.push('login');
		}
	}
	render() {
		return(
			<header className="site-header header-one ">
				<nav className="navbar navbar-expand-lg navbar-light header-navigation stricky">
					<div className="container clearfix">

						<div className="logo-box clearfix">
							<a className="navbar-brand" href="index.html">
								<img src={logo} className="main-logo" width="150" alt="Awesome" />
							</a>
							<button className="menu-toggler" data-target=".main-navigation">
								<span className="fa fa-bars"></span>
							</button>
						</div>

						<div className="main-navigation">
								<ul className=" navigation-box one-page-scroll-menu ">
									<li className="current scrollToLink">
										<a href="#home">Inicio</a>
									</li>
									<li className="scrollToLink">
										<a href="#services">¿Como funciona?</a>
									</li>
									<li className="scrollToLink">
										<a href="/auctions">Subastas</a>
									</li>
									<li className="scrollToLink">
										<a href="#pricing">Tokens</a>
									</li>
								</ul>
						</div>

						<div className="right-side-box">
							<a href="#" onClick={() => this.sessionAction() } className="thm-btn header-one__btn">
								{this.state.sessionMessage}
							</a>
						</div>

					</div>

				</nav>
			</header>
		)
	}
}

const Header = withRouter(HeaderBase);
export default Header;
