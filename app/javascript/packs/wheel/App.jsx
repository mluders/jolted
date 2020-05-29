import React from 'react'
import Form from './Form';
import Prize from './Prize';
import Spinner from './Spinner';
import Wheel from './Wheel';

const WHEEL_URL = '/proxy/wheels'

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetchingPrize: false,
      wheel: null,
      wheelHasSpun: false,
      prize: null
    }
  }

  onFormSubmit = (email) => {
    this.setState({
      ...this.state,
      isFetchingPrize: true,
    }, () => this.fetchPrize(email))
  };

  fetchPrize = async (email) => {
    const data = { email }
    const response = await fetch(WHEEL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const { prize, segment } = await response.json();

    this.setState({
      ...this.state,
      isFetchingPrize: false,
      prize: prize
    }, () => this.spinWheel(segment));
  };

  spinWheel = (segment) => {
    const { wheel } = this.state;
    let stopAt = wheel.getRandomForSegment(segment);
    wheel.animation.stopAngle = stopAt;
    wheel.startAnimation();
  };

  onCreateWheel = (wheel) => {
    this.setState({
      ...this.state,
      wheel
    });
  }

  afterSpinWheel = () => {
    this.setState({
      ...this.state,
      wheelHasSpun: true
    })
  };

  currentFormComponent = () => {
    const { isFetchingPrize, wheelHasSpun, prize } = this.state;

    if (isFetchingPrize) return <Spinner />;
    if (prize && wheelHasSpun) return <Prize prize={prize} />
    if (prize) return null;

    return (
      <Form
        callToAction='Try your luck'
        onSubmit={this.onFormSubmit}
      />
    );
  }

  render() {
    return (
      <div>
        {this.currentFormComponent()}

        <Wheel
          onCreateWheel={this.onCreateWheel}
          afterSpinWheel={this.afterSpinWheel}
        />
      </div>
    );
  }
}
