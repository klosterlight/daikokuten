import React from 'react';
import { Header, Footer } from 'components/Common';

export default class Dashboard extends React.Component {
	render() {
		return (
			<div className="page-wrapper" >
				<Header />
				<section className="inner-banner">
					<div className="container">
						<h2 className="inner-banner__title">Subastas</h2>
						<ul className="thm-breadcrumb">
							<li className="thm-breadcrumb__item">
								<a href="/" className="thm-breadcrumb__link">Inicio</a>
							</li>
							<li className="thm-breadcrumb__item current">
								<button className="thm-breadcrumb__link link-button">Admin</button>
							</li>
						</ul>
					</div>
				</section>
				<section className="service-one" id="services">
					<div className="container">
						<div className="comprarBtn">
							<a href="/admin/auctions/new">Crear Subasta</a>
						</div>
						<div className="comprarBtn">
							<a href="/admin/auctions">Ver Subastas</a>
						</div>
					</div>
				</section>
				<Footer />
			</div>
		)
	}
}
