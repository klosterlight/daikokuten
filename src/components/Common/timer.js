import React from "react";
import moment from "moment";
import { withFirebase } from "../Firebase";

const TIME_FORMAT = "hh:mm:ss a";

class TimerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentServerTime: 0,
      currentTime: "Loading..."
    };
  }
  tick = () => {
    setInterval(() => {
      const currentServerTime = this.state.currentServerTime + 1000;
      this.setState({
        currentServerTime: currentServerTime,
        currentTime: moment(currentServerTime).format(TIME_FORMAT)
      });
    }, 1000);
  }
  componentDidMount() {
    const self = this;
    this.props.firebase.serverTime().on('value', (offset) => {
      const offsetVal = offset.val() || 0;
      const currentServerTime = moment() + offsetVal
      self.setState({
        currentServerTime: currentServerTime,
        currentServerTimeString: moment(currentServerTime).format(TIME_FORMAT)
      });
      self.tick();
      return 0;
    });
  }

  render() {
    return (
      <div>
        {this.state.currentTime}
      </div>
    )
  }
}

const Timer = withFirebase(TimerComponent);

export default Timer;
