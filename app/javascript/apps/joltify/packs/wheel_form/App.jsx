import React from 'react'
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import Form from './Form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wheel: null
    }
  }

  componentDidMount() {
    this.getWheelData();
  }

  getWheelData = async () => {
    const wheelData = document.getElementById('wheel-data');
    const wheel = JSON.parse(wheelData.dataset.wheel);

    this.setState({
      ...this.state,
      wheel
    });
  }

  onSegmentChange = (index, key, value) => {
    const { wheel } = this.state;
    if (!wheel) return;

    wheel.wheel_segments[index][key] = value;
    this.setState({
      ...this.state,
      wheel
    });
  }

  render() {
    const { wheel } = this.state;

    return (
      <div>
        { !wheel && <Spinner /> }
        { wheel && <Form wheel={wheel} onSegmentChange={this.onSegmentChange} /> }
      </div>
    );
  }
}
