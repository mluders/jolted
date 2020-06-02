import React from 'react'
import PropTypes from 'prop-types';
import Form from './Form';
import Prize from './Prize';
import Spinner from './Spinner';
import Wheel from './Wheel';

export default class App extends React.Component {
  static propTypes = {
    shopId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      wheelData: null,
      wheel: null,
      prize: null,
      isFetchingPrize: false,
      wheelHasSpun: false
    }

    this.fetchWheelData();
  }

  discountCodeURL = () => {
    const { shopId } = this.props;
    return `/proxy/shops/${shopId}/discount_codes`
  }

  wheelURL = () => {
    const { shopId } = this.props;
    return `/proxy/shops/${shopId}/wheel`
  }

  fetchWheelData = async () => {
    const url = this.wheelURL();

    const response = await fetch(url);
    const { wheel } = await response.json();

    this.setState({
      ...this.state,
      wheelData: wheel
    });
  }

  fetchPrize = async (email) => {
    const data = { email };
    const url = this.discountCodeURL();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const { prize, segment_index: segmentIndex } = await response.json();

    this.setState({
      ...this.state,
      isFetchingPrize: false,
      prize: prize
    }, () => this.spinWheel(segmentIndex));
  };

  spinWheel = (segment) => {
    const { wheel } = this.state;
    let stopAt = wheel.getRandomForSegment(segment);
    wheel.animation.stopAngle = stopAt;
    wheel.startAnimation();
  };

  onFormSubmit = (email) => {
    this.setState({
      ...this.state,
      isFetchingPrize: true,
    }, () => this.fetchPrize(email))
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
    const { wheelData, prize, isFetchingPrize, wheelHasSpun } = this.state;

    if (!wheelData) return <Spinner />;
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
    const { wheelData } = this.state;

    return (
      <div>
        {this.currentFormComponent()}

        {
          wheelData &&
          <Wheel
            wheelData={wheelData}
            onCreateWheel={this.onCreateWheel}
            afterSpinWheel={this.afterSpinWheel}
          />
        }
      </div>
    );
  }
}
