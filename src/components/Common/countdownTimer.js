import React from "react";
import moment from "moment";
import { withFirebase } from "../Firebase";

const ONE_TICK = 1000;
const TIME_FORMAT = "mm:ss"

class CountdownTimerComponent extends React.Component {
  getRemainingTime = () => {
    const remainingTime = this.remainingTime - ONE_TICK;
    if(remainingTime < 0) {
      if(this.showAlert) {
        alert("SE ACABO")
        this.showAlert = false;
      }
      this.remainingTime = 0;
      return "00:00"
    } else {
      const momentRemainingTime = moment(remainingTime);
      if(momentRemainingTime.isValid()) {
        this.remainingTime = remainingTime;
        return moment(remainingTime).format(TIME_FORMAT);
      } else {
        return "Loading...";
      }
    }
  }

  componentDidMount() {
    const self = this;
    this.showAlert = true;
    this.props.firebase.roomClosingTime().on('value', (offset) => {
      const closingTimeValue = offset.val() || 0;
      const closingTime = moment(closingTimeValue.closingTime);
      this.props.firebase.serverTime().on('value', (offset) => {
        const serverTimeValue = offset.val() || 0;
        const serverTime = moment() + serverTimeValue;
        const remainingTime = moment.duration(closingTime.diff(serverTime));
        this.remainingTime = remainingTime;
      })
    });
  }
  render() {
    return (
      <div>
        {this.getRemainingTime()}
      </div>
    )
  }
}

const CountdownTimer = withFirebase(CountdownTimerComponent);

export default CountdownTimer;