import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CreateRoom from 'components/Admin';
import { withFirebase } from 'components/Firebase';
import * as ROUTES from 'constants/routes';

class RoomsComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: []
		};
	}

	componentDidMount() {
		this.props.firebase.rooms().on('value', snapshot => {
			const roomObject = snapshot.val();
			if(roomObject) {
				const roomList = Object.keys(roomObject).map(key => ({
					...roomObject[key],
					name: roomObject[key].name,
					uid: key
				}));

				this.setState({
					rooms: roomList
				});
			}
		});
	}

	render() {
		const { rooms } = this.state;
		return(
			<Container>
				<Row>
					<Col>
						<CreateRoom />
						<ul>
							{rooms ? (
								this.state.rooms.map((room) => {
									const link = ROUTES.ROOM.replace(":id", room.uid);
									return (<li key={room.uid}><a href={link}>{room.uid}</a></li>);
								})
							) : (
								<div>There are no rooms ...</div>
							)}
						</ul>
					</Col>
				</Row>
			</Container>
		)
	}
}

const Rooms = withFirebase(RoomsComponent);
export default Rooms;
