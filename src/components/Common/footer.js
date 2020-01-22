import React from 'react';
import { withRouter } from "react-router-dom";

import logo from "assets/images/logo-1-1.png";

class FooterBase extends React.Component {
	render() {
		return (
			<footer className="site-footer">
				<div className="site-footer__upper">
					<div className="container">
						<div className="row">
							<div className="col-lg-5">
								<div className="footer-widget">
									<a href="index.html" className="footer-widget__logo">
										<img src={logo} width="132" alt="Awesome" /></a>
									<p className="footer-widget__text">!dale click en comprar antes de que alguien más te lo vaya a ganar!</p>
								</div>
							</div>
							<div className="col-lg-4">
								<div className="footer-widget">
									<ul className="footer-widget__links">
										<li className="footer-widget__links-item"><a href="/">Inicio</a></li>
										<li className="footer-widget__links-item"><a href="/">¿Cómo funciona?</a></li>
										<li className="footer-widget__links-item"><a href="/">Tokens</a></li>
										<li className="footer-widget__links-item"><a href="/auctions.html">Subastas</a></li>
									</ul>
									<ul className="footer-widget__links">
										<li className="footer-widget__links-item"><a href="/">politicas y privacidad</a></li>
										<li className="footer-widget__links-item"><a href="/">Contáctanos</a></li>
										<li className="footer-widget__links-item"><a href="/">Preguntas frecuentes</a></li>
									</ul>
								</div>
							</div>
							<div className="col-lg-3">
								<div className="footer-widget">
									<a href="/" className="footer-widget__btn">
										<i className="fa fa-play"></i>
										<span className="footer-widget__btn-text">
											Descarga <span className="footer-widget__btn-text-highlight">Limbo App</span>
										</span>
									</a>

								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="site-footer__bottom">
					<div className="container">
						<div className="site-footer__social">
							<a href="/"><i className="fa fa-facebook-square"></i></a>
							<a href="/"><i className="fa fa-twitter"></i></a>
							<a href="/"><i className="fa fa-instagram"></i></a>
							<a href="/"><i className="fa fa-pinterest-p"></i></a>
						</div>
						<p className="site-footer__copy-text"><i className="fa fa-copyright"></i>copyright 2019  <a href="/">limboauctions.com</a></p>
					</div>
				</div>
			</footer>
		)
	}
}

const Footer = withRouter(FooterBase);
export default Footer;
