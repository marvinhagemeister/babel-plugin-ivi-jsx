import { Component } from "ivi";

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.counter = 0;
  }

  attached() {
    setInterval(() => {
      this.counter++;
      this.invalidate();
    }, 1000);
  }

  render() {
    return (
      <div>
        {this.props.children}
        Counter: {this.counter}
      </div>
    );
  }
}
