import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from '../Common';
import { Messages } from './index';
import { Bid } from './index';
import { CountdownTimer } from '../Common';
import { CurrentUser } from '../Common';
import { withFirebase } from '../Firebase';
import CreateRoom from '../Admin';
import moment from "moment";

class RoomBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      messages: [],
      text: '',
      tickTimer: 0,
      denyBid: false
    };
  }

  componentDidMount() {
    const currentUser = CurrentUser();
    if(currentUser) {
      this.setState({
        displayName: currentUser.displayName
      });
    }
    this.setState({ loading: true });
    this.interval = setInterval(() => {
      this.setState({
        tickTimer: this.state.tickTimer + 1
      });
    }, 1000);
    this.props.firebase.messages().on('value', snapshot => {
      const messageObject = snapshot.val();
      if(messageObject) {
        const messageList = Object.keys(messageObject).map(key => ({
          ...messageObject[key],
          uid: key,
          sentAt: moment(messageObject[key].timestamp).format("DD/MM/YYYY hh:mm:ss")
        }));
        this.setState({
          messages: messageList,
          loading: false,
        });
      }
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
      displayName: this.state.displayName,
      timestamp: this.props.firebase.timeStamp
    }).then(e => {
      console.log(e);
    }).catch(e => {
      console.log(e);
    });
    this.setState({ text: '' });
    event.preventDefault();
  };

  denyBid = () => {
    this.setState({
      denyBid: true
    });
  }

  render() {
    const { text, messages } = this.state;
    return(
      <Container>
        <Header tickTimer={this.state.tickTimer}/>
        <Row xs={12}>
          <Col xs={8}>
            <CountdownTimer tickTimer={this.state.tickTimer} denyBid={this.denyBid} />
            <CreateRoom />
            <Bid denyBid={this.state.denyBid} />
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
