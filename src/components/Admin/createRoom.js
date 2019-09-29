import React from "react";
import Button from 'react-bootstrap/Button';
import moment from "moment";
import { withFirebase } from '../Firebase';

class CreateRoomComponent extends React.Component {
  create = () => {
    const closingTime = moment().add(5, 'minutes');
    console.log(closingTime);
    // this.props.firebase.rooms().push({
    //   closingTime: closingTime,
    //   messages: []
    // });
    this.props.firebase.roomClosingTime().set({
      closingTime: closingTime.valueOf()
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
