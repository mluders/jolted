import React from 'react'
import PropTypes from 'prop-types';
import Form from './Form';
import Prize from './Prize';
import Spinner from './Spinner';
import Wheel from './Wheel';

// TODO: delete this function
function fakeEmail() {
  var chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  var string = '';
  for(var ii=0; ii<15; ii++){
      string += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${string}@fake.com`;
}

export default class App extends React.Component {
  static propTypes = {
    shopId: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      wheelData: null,
      wheel: null,
      email: fakeEmail(),
      prize: null,
      isFetchingPrize: false,
      wheelHasSpun: false,
      formError: ''
    }

    this.fetchWheelData();
  }

  discountCodeURL = () => {
    const { shopId } = this.props;
    return `/apps/joltify/shops/${shopId}/discount_codes`
  }

  wheelURL = () => {
    const { shopId } = this.props;
    return `/apps/joltify/shops/${shopId}/wheel`
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

    const body = await response.json();

    switch (response.status) {
      case 201:
        const { prize, segment_index: segmentIndex } = body;
        this.setState({
          ...this.state,
          isFetchingPrize: false,
          prize: prize
        }, () => this.spinWheel(segmentIndex));
        break;
      case 422:
        this.setState({
          ...this.state,
          isFetchingPrize: false,
          formError: "You've already spun the wheel"
        });
        break;
      default:
        this.setState({
          ...this.state,
          isFetchingPrize: false,
          formError: 'Something went wrong'
        });
    }
  };

  spinWheel = (segment) => {
    const { wheel } = this.state;
    let stopAt = wheel.getRandomForSegment(segment);
    wheel.animation.stopAngle = stopAt;
    wheel.startAnimation();
  };

  onChangeEmail = (email) => {
    this.setState({
      ...this.state,
      email: email
    });
  }

  onFormSubmit = () => {
    const { email } = this.state;

    this.setState({
      ...this.state,
      isFetchingPrize: true,
      formError: ''
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
    const { wheelData, email, prize, isFetchingPrize, wheelHasSpun } = this.state;

    if (!wheelData) return <Spinner />;
    if (isFetchingPrize) return <Spinner />;
    if (prize && wheelHasSpun) return <Prize prize={prize} />
    if (prize) return null;

    return (
      <Form
        email={email}
        callToAction='Try your luck'
        onChangeEmail={this.onChangeEmail}
        onSubmit={this.onFormSubmit}
      />
    );
  }

  render() {
    const { wheelData, formError } = this.state;

    return (
      <div>
        <div className="container" style={{ height: '100vh' }}>
          <div className="row justify-content-center text-center" style={{ height: '100vh' }}>
            <div className="col-12 col-md-6 col-lg-6 order-2 order-md-1">
              {
                wheelData &&
                <Wheel
                  wheelData={wheelData}
                  onCreateWheel={this.onCreateWheel}
                  afterSpinWheel={this.afterSpinWheel}
                />
              }
            </div>
            <div className="col-12 col-md-6 col-lg-6 order-1 order-md-2 align-self-center">
              {
                formError &&
                <div className="alert alert-danger" role="alert">{formError}</div>
              }

              {this.currentFormComponent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
