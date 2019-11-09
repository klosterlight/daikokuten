import React from 'react';
import { withFirebase } from 'components/Firebase';
import { Header, Footer } from 'components/Common';
import logo from "assets/images/logo-1-1.png";

class AuctionsBase extends React.Component {
	render() {
		return (
			<React.Fragment>
				<div className="page-wrapper">
					<Header />
					<section className="inner-banner">
						<div className="container">
							<h2 className="inner-banner__title">Subastas</h2>
							<ul className="thm-breadcrumb">
								<li className="thm-breadcrumb__item">
									<a href="#" className="thm-breadcrumb__link">Inicio</a>
								</li>
								<li className="thm-breadcrumb__item current">
									<a href="#" className="thm-breadcrumb__link">Subastas</a>
								</li>
							</ul>
						</div>
					</section>
					<section className="blog-one blog-page">
						<div className="container">
							<div className="row">
								<div className="col-lg-4">
									<div className="blog-one__single">
										<div className="blog-one__image">
											<img src="images/blog-1-1.jpg" alt="Limbo" />
											<a href="room.html"><i className="appyn-icon-plus-symbol"></i></a>
										</div>
										<div className="blog-one__content">

											<h3 className="blog-one__title"><a href="room.html">iPhone 11</a></h3>
											<div className="priceNshit">
												<h4>$21,000</h4>
												<span>
													180 tokens
													<div>entrar a la subasta</div>
												</span>
											</div>

											<div className="timenshit">
												<div className="fecha">
													<div> 10 de Octubre 2019</div>
													16:20 hrs
												</div>
												<div className="falta">
													<div>Comienza en: </div>
													12:10:12
												</div>

											</div>

											<p className="blog-one__text">There are many variations of passages of available but majority have alteration in some by inject humour or random words.</p>
										</div>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="blog-one__single">
										<div className="blog-one__image">
											<img src="images/blog-1-2.jpg" alt="Limbo" />
											<a href="room.html"><i className="appyn-icon-plus-symbol"></i></a>
										</div>
										<div className="blog-one__content">

											<h3 className="blog-one__title"><a href="room.html">Samsung Note 10 </a></h3>
											<div className="priceNshit">
												<h4>$18,990</h4>
												<span>
													150 tokens
													<div>entrar a la subasta</div>
												</span>
											</div>
											<div className="timenshit">
												<div className="fecha">
													<div> 11 de Octubre 2019</div>
													16:20 hrs
												</div>
												<div className="falta">
													<div>Comienza en: </div>
													12:10:12
												</div>

											</div>
											<p className="blog-one__text">There are many variations of passages of available but majority have alteration in some by inject humour or random words.</p>
										</div>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="blog-one__single">
										<div className="blog-one__image">
											<img src="images/blog-1-3.jpg" alt="Limbo" />
											<a href="room.html"><i className="appyn-icon-plus-symbol"></i></a>
										</div>
										<div className="blog-one__content">

											<h3 className="blog-one__title"><a href="room.html">DJI Mavic Pro</a></h3>
											<div className="priceNshit">
												<h4>$18,500</h4>
												<span className="ready">
													Listo
													<div>para entrar</div>
												</span>
											</div>
											<div className="timenshit">
												<div className="fecha">
													<div> 12 de Octubre 2019</div>
													16:20 hrs
												</div>
												<div className="falta">
													<div>Comienza en: </div>
													12:10:12
												</div>

											</div>
											<p className="blog-one__text">There are many variations of passages of available but majority have alteration in some by inject humour or random words.</p>
										</div>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="blog-one__single">
										<div className="blog-one__image">
											<img src="images/blog-1-4.jpg" alt="Limbo" />
											<a href="room.html"><i className="appyn-icon-plus-symbol"></i></a>
										</div>
										<div className="blog-one__content">

											<h3 className="blog-one__title"><a href="room.html">Bose Soundlink</a></h3>
											<div className="priceNshit">
												<h4>$4,690</h4>
												<span>
													150 tokens
													<div>entrar a la subasta</div>
												</span>
											</div>
											<div className="timenshit">
												<div className="fecha">
													<div> 14 de Octubre 2019</div>
													16:20 hrs
												</div>
												<div className="falta">
													<div>Comienza en: </div>
													42:10:12
												</div>

											</div>
											<p className="blog-one__text">There are many variations of passages of available but majority have alteration in some by inject humour or random words.</p>
										</div>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="blog-one__single">
										<div className="blog-one__image">
											<img src="images/blog-1-5.jpg" alt="Limbo" />
											<a href="room.html"><i className="appyn-icon-plus-symbol"></i></a>
										</div>
										<div className="blog-one__content">

											<h3 className="blog-one__title"><a href="room.html">Teclado Mecanico</a></h3>
											<div className="priceNshit">
												<h4>$3,390</h4>
												<span className="ready">
													Listo
													<div>para entrar</div>
												</span>
											</div>
											<div className="timenshit">
												<div className="fecha">
													<div> 15 de Octubre 2019</div>
													16:20 hrs
												</div>
												<div className="falta">
													<div>Comienza en: </div>
													62:10:12
												</div>

											</div>
											<p className="blog-one__text">There are many variations of passages of available but majority have alteration in some by inject humour or random words.</p>
										</div>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="blog-one__single">
										<div className="blog-one__image">
											<img src="images/blog-1-6.jpg" alt="Limbo" />
											<a href="room.html"><i className="appyn-icon-plus-symbol"></i></a>
										</div>
										<div className="blog-one__content">

											<h3 className="blog-one__title"><a href="room.html">Lenovo Thinkpad x10</a></h3>
											<div className="priceNshit">
												<h4>$38,990</h4>
												<span>
													150 tokens
													<div>entrar a la subasta</div>
												</span>
											</div>
											<div className="timenshit">
												<div className="fecha">
													<div> 16 de Octubre 2019</div>
													16:20 hrs
												</div>
												<div className="falta">
													<div>Comienza en: </div>
													82:10:12
												</div>

											</div>
											<p className="blog-one__text">There are many variations of passages of available but majority have alteration in some by inject humour or random words.</p>
										</div>
									</div>
								</div>
							</div>
							<div className="blog-post-pagination text-center">
								<a className="prev" href="#"><i className="fa fa-angle-left"></i></a>
								<a className="active" href="#">01</a>
								<a href="#">02</a>
								<a href="#">03</a>
								<a href="#">04</a>
								<a href="#">05</a>
								<a className="next" href="#"><i className="fa fa-angle-right"></i></a>
							</div>
						</div>
					</section>
					<Footer />
				</div>
				<a href="#" data-target="html" className="scroll-to-target scroll-to-top"><i className="fa fa-angle-up"></i></a>
			</React.Fragment>
		)
	}
}

const Auctions = withFirebase(AuctionsBase);

export default Auctions;
