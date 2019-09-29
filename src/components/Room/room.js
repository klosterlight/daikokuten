import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../Common';
import { Messages } from './index';
import { withFirebase } from '../Firebase';

class RoomBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      messages: [],
      text: ''
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.messages().on('child_added', snapshot => {
      console.log(snapshot);
      const messageObject = {
        text: snapshot.val().text,
        uid: snapshot.key
      };
      // convert messages list from snapshot
      this.setState(prevState => ({
        messages: [...prevState.messages, messageObject]
      }));
    });
  }
  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = event => {
    this.props.firebase.messages().push({
      text: this.state.text,
    }).then(e => {
      console.log(e);
    }).catch(e => {
      console.log(e);
    });
    this.setState({ text: '' });
    event.preventDefault();
  };

  render() {
    const { text, messages } = this.state;
    return(
      <Container>
        <Header />
        <Row xs={12}>
          <Col xs={8}>
          </Col>
          <Col xs={4}>
            <Row>
              {messages ? (
                <Messages messages={messages} />
              ) : (
                <div>There are no messages ...</div>
              )}
            </Row>
            <Row>
              <form onSubmit={this.onCreateMessage}>
                <input
                  type="text"
                  value={text}
                  onChange={this.onChangeText}
                />
                <button type="submit">Send</button>
              </form>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

const Room = withFirebase(RoomBase);
export default Room;
