import React from "react";

import { withFirebase } from 'components/Firebase';
import { Header, Footer } from 'components/Common';

import banner from "assets/images/banner-1-1.png";
import video from "assets/images/video.png";
import appScreen1 from "assets/images/app-screen-1-1.png";
import appScreen2 from "assets/images/app-screen-1-1.png";
import appScreen3 from "assets/images/app-screen-1-3.png";
import appScreen4 from "assets/images/app-screen-1-4.png";
import appScreen5 from "assets/images/app-screen-1-5.png";
import testiShape1 from "assets/images/shapes/testi-shape-1-1.png";
import testi1 from "assets/images/testi-1-1.png";
import testi2 from "assets/images/testi-1-2.png";
import testi3 from "assets/images/testi-1-3.png";

class LandingBase extends React.Component {

	render() {
		return (
			<React.Fragment>
				<div className="page-wrapper" >
					<Header />
					<section className="banner-one" id="home">

						<div className="container">
							<div className="banner-one__moc-wrap">
								<img src={banner} className="banner-one__moc" alt="Awesome" />
							</div>
							<div className="row justify-content-end">
								<div className="col-lg-5 col-md-6">
									<div className="banner-one__content">
										<h3 className="banner-one__title">
											Productos y servicios
											exclusivos al mejor precio

										</h3>

											<p className="banner-one__text">
												El precio disminuye a medida que avanza el reloj
												hasta llegar a lo que quieres Pagar
											</p>
											<a href="#services" className="scrollToLink banner-one__btn thm-btn">Descubre más</a>
									</div>
								</div>
							</div>
						</div>

					</section>

					<section className="service-one" id="services">
						<div className="container">
							<div className="block-title text-center">
								<h2 className="block-title__title">¿Cómo funciona limbo?</h2>
							</div>
							<div className="row">
								<div className="col-lg-4">
									<div className="service-one__single">
										<div className="service-one__icon">
											<i className="fa fa-th"></i>
										</div>
										<h3 className="service-one__title"><a href="#0">Gran variedad de artículos</a></h3>

										<p className="service-one__text">
											Busca el artículo que te interesa adquirir y registrate para la subasta
										</p>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="service-one__single">
										<div className="service-one__icon">
											<i className="fa fa-clock-o"></i>
										</div>
										<h3 className="service-one__title"><a href="#0">Tiempo limitado</a></h3>

										<p className="service-one__text">
											Cuando entres a la subasta en la fecha y hora programada el precio empezará a disminuir,
											!dale click en comprar antes que alguien más lo haga!
										</p>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="service-one__single">
										<div className="service-one__icon">
											<i className="appyn-icon-target-1"></i>
										</div>
										<h3 className="service-one__title"><a href="#0">Precio más bajo de mercado</a></h3>

										<p className="service-one__text">
											Obtén precios reducidos por medio de subastas holandesas
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>
					<div className="video-one">
						<div className="container">
							<div className="block-title text-center">
							</div>
							<div className="video-one__content">
								<img src={video} alt="Awesome" />
								<a href="https://www.youtube.com/watch?v=n-D1EB74Ckg" className="video-one__link video-popup"><i className="fa fa-play"></i></a>
							</div>
						</div>
					</div>
					<section className="app-screen-one" id="screens">
						<div className="container-fluid">
							<div className="block-title text-center">
								<h2 className="block-title__title">Subastas</h2>
							</div>
							<div className="app-screen-one__carousel owl-carousel owl-theme">
								<div className="item">
									<img src={appScreen1} alt="Awesome" />
								</div>
								<div className="item">
									<img src={appScreen2} alt="Awesome" />
								</div>
								<div className="item">
									<img src={appScreen3} alt="Awesome" />
								</div>
								<div className="item">
									<img src={appScreen4} alt="Awesome" />
								</div>
								<div className="item">
									<img src={appScreen5} alt="Awesome" />
								</div>
								<div className="item">
									<img src={appScreen1} alt="Awesome" />
								</div>
								<div className="item">
									<img src={appScreen2} alt="Awesome" />
								</div>
								<div className="item">
									<img src={appScreen3} alt="Awesome" />
								</div>
								<div className="item">
									<img src={appScreen4} alt="Awesome" />
								</div>
								<div className="item">
									<img src={appScreen5} alt="Awesome" />
								</div>
								<div className="item">
									<img src={appScreen1} alt="Awesome" />
								</div>
								<div className="item">
									<img src={appScreen2} alt="Awesome" />
								</div>
								<div className="item">
									<img src={appScreen3} alt="Awesome" />
								</div>
								<div className="item">
									<img src={appScreen4} alt="Awesome" />
								</div>
								<div className="item">
									<img src={appScreen5} alt="Awesome" />
								</div>
							</div>
						</div>
					</section>
					<section className="pricing-one" id="pricing">
						<div className="container">
							<div className="block-title text-center">
								<h2 className="block-title__title">Tokens</h2>
							</div>
							<div className=" toks">
								<h3>
										Usa los tokens para ingresar a las subastas, los primeros tokens van por nuestra cuenta
								</h3>
								<h4>Descubrirás muchas formas de obtener tokens para que sigas comprando al mejor precio</h4>
							</div>
						</div>
					</section>

					<section className="testimonials-one">
						<img src={testiShape1} className="testimonials-one__background-image"
								alt="Awesome" />
						<div className="container">
							<div className="row ">
								<div className="col-lg-6">
									<div className="testimonials-one__thumb-carousel">
										<div className="swiper-wrapper">
											<div className="swiper-slide">
												<img src={testi1} alt="Awesome" />
											</div>
											<div className="swiper-slide">
												<img src={testi2} alt="Awesome" />
											</div>
											<div className="swiper-slide">
												<img src={testi3} alt="Awesome" />
											</div>
										</div>
									</div>
								</div>
								<div className="col-lg-6 d-flex">
									<div className="my-auto">
										<div className="block-title text-left">
											<h2 className="block-title__title">El tiempo corre y sigues sin comprar</h2>
											<p>
													No dejes pasar el tiempo, obtén los mejores productos y servicios antes que los demás
											</p>

										</div>
										<div className="swiper-pagination"></div>
									</div>
								</div>
							</div>
						</div>
					</section>

					<section className="subscribe-one" id="emailSub">
						<div className="container">
							<div className="block-title text-center">
								<h2 className="block-title__title">Se de los primeros en <br /> ahorar utilizando LIMBO</h2>
							</div>
						</div>
					</section>
					<Footer />
				</div>
				<a href="/" data-target="html" className="scroll-to-target scroll-to-top"><i className="fa fa-angle-up"></i></a>
			</React.Fragment>
		)
	}
}

const Landing = withFirebase(LandingBase);

export default Landing;
