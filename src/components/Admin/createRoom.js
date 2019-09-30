import React from "react";
import Button from 'react-bootstrap/Button';
import moment from "moment";
import { withFirebase } from '../Firebase';

class CreateRoomComponent extends React.Component {
  create = () => {
    const closingTime = moment().add(60, 'minutes');
    this.props.firebase.rooms().push({
      closingTime: closingTime.valueOf(),
      initialValue: 1000,
      rateOfDecrement: 1,
      messages: []
    });
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.create()}>Crear Cuarto</Button>
      </div>
    )
  }
}

const CreateRoom = withFirebase(CreateRoomComponent);
export default CreateRoom;
