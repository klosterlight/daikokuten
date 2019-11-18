import React from "react";
import moment from "moment";
import { withFirebase } from 'components/Firebase';
import { Header, Footer } from 'components/Common';

class CreateAuctionComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			startingPrice: 0,
			endPrice: 0,
			currency: 'MXN',
			priceDecreaseRate: 0,
			maxAuctions: 10,
			shortDescription: '',
			longDescription: '',
			imageUrl: '',
			tokens: 100,
			startingAt: moment().unix(),
			endingAt: moment().add(10, "minutes").unix()
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let auctionParams = this.state;
		// TODO: Move this to server side. Price rate decrease per tick (1 TICK = 1s).
		// (startingPrice - endPrice) / auction_duration
		const auctionDuration = moment(auctionParams.endingAt).unix() - moment(auctionParams.startingAt).unix();
		auctionParams.startingAt = new Date(auctionParams.startingAt);
		auctionParams.endingAt = new Date(auctionParams.endingAt);
		const totalPrice = auctionParams.startingPrice - auctionParams.endPrice;
		auctionParams.priceDecreaseRate = totalPrice / auctionDuration;

		auctionParams.createdAt = new Date();
		auctionParams.updatedAt = new Date();

		// TODO: Add server side validations
		// TODO: Add client side validations
		this.props.firebase.addAuction(auctionParams).then((res) => {
			console.log(res);
			alert('YEII! Se creo la subasta');
			// TODO: Go to someplace else
		}).catch((err) => {
			alert('Pura tristeza no se creo la subasta');
			console.log(err);
		});
	}

	uploadFile = (e) => {
		const file = e.target.files[0];
		const self = this;
		if(file)
		{
			// TODO: Show LOADING for upload
			this.props.firebase.uploadFile(`${moment().unix()}_${file.name}`, file).then((res) => {
				self.setState({
					imageUrl: res.ref.fullPath
				});
			}).catch((err) => {
				console.log(err);
			});
		}
	}

	handleChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

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
							<li className="thm-breadcrumb__item">
								<a href="/admin/dashboard" className="thm-breadcrumb__link">Admin</a>
							</li>
							<li className="thm-breadcrumb__item current">
								<button className="thm-breadcrumb__link link-button">Subastas</button>
							</li>
						</ul>
					</div>
				</section>
				<section className="service-one" id="services">
					<div className="container">
						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<label htmlFor="fileToUpload">Imágen</label>
								<input type="file" className="form-control" id="fileToUpload" name="fileToUpload" onChange={this.uploadFile} />
							</div>
							<div className="form-group">
								<label htmlFor="title">Titulo</label>
								<input type="text" className="form-control" id="title" name="title" onChange={this.handleChange} />
							</div>
							<div className="form-group">
								<label htmlFor="shortDescription">Intro</label>
								<textarea className="form-control" row="3" id="shortDescription" name="shortDescription" value={this.state.shortDescription} onChange={this.handleChange}></textarea>
							</div>
							<div className="form-group">
								<label htmlFor="longDescription">Descripción</label>
								<textarea className="form-control" row="3" id="longDescription" name="longDescription" value={this.state.longDescription} onChange={this.handleChange}></textarea>
							</div>
							<div className="form-group">
								<label htmlFor="startingPrice">Precio Inicial</label>
								<input type="number" className="form-control" id="startingPrice" name="startingPrice" onChange={this.handleChange} />
							</div>
							<div className="form-group">
								<label htmlFor="endPrice">Precio mas bajo</label>
								<input type="number" className="form-control" id="endPrice" name="endPrice" onChange={this.handleChange} />
							</div>
							<div className="form-group">
								<label htmlFor="tokens">Tokens</label>
								<input type="number" className="form-control" id="tokens" name="tokens" onChange={this.handleChange} />
							</div>
							<div className="form-group">
								<label htmlFor="startingAt">Empieza en</label>
								<input type="datetime-local" className="form-control" id="startingAt" name="startingAt" onChange={this.handleChange} />
							</div>
							<div className="form-group">
								<label htmlFor="endingAt">Termina en</label>
								<input type="datetime-local" className="form-control" id="endingAt" name="endingAt" onChange={this.handleChange} />
							</div>
							<input type="submit" className="btn btn-primary" value="Crear Subasta" />
						</form>
					</div>
				</section>
				<Footer />
			</div>
		)
	}
}

const CreateAuction = withFirebase(CreateAuctionComponent);
export default CreateAuction;
