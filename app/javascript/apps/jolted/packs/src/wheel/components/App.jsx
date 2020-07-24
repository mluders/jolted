import React from 'react'
import PropTypes from 'prop-types';
import Form from './Form';
import Prize from './Prize';
import Spinner from './Spinner';
import Wheel from './Wheel';
import CloseButton from './CloseButton';
import PreviewBadge from './PreviewBadge';

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
    isPreview: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      wheelData: null,
      wheel: null,
      email: '',
      prizeLabel: null,
      prizeDescription: null,
      prizeValue: null,
      isFetchingPrize: false,
      wheelHasSpun: false,
      formError: ''
    }
  }

  componentDidMount() {
    this.fetchWheelData();
  }

  closePopup = () => {
    window.parent.postMessage({
      message: 'CLOSE_POPUP'
    }, '*');
  };

  discountCodeURL = () => {
    const { shopId } = this.props;
    return `/apps/jolted/shops/${shopId}/discount_codes`
  };

  wheelURL = () => {
    const { shopId } = this.props;
    return `/apps/jolted/shops/${shopId}/wheel`
  };

  fetchWheelData = async () => {
    const url = this.wheelURL();

    const response = await fetch(url);
    const { wheel } = await response.json();

    this.setState({
      ...this.state,
      wheelData: wheel
    });
  };

  fetchPrize = async (email) => {
    const data = {
      'email': email,
      'is_preview': this.props.isPreview
    };
    const url = this.discountCodeURL();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const body = await response.json();

    switch (response.status) {
      case 201:
        const {
          'prize_label': prizeLabel,
          'prize_description': prizeDescription,
          'prize_value': prizeValue,
          'segment_index': segmentIndex
        } = body;

        this.setState({
          ...this.state,
          isFetchingPrize: false,
          prizeLabel,
          prizeDescription,
          prizeValue
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

  acceptPrize = () => {
    this.closePopup();
  };

  spinWheel = (segment) => {
    const { wheel } = this.state;
    let stopAt = wheel.getRandomForSegment(segment+1);
    wheel.animation.stopAngle = stopAt;
    wheel.startAnimation();
  };

  onChangeEmail = (email) => {
    this.setState({
      ...this.state,
      email: email
    });
  };

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
  };

  afterSpinWheel = () => {
    this.setState({
      ...this.state,
      wheelHasSpun: true
    })
  };

  currentFormComponent = () => {
    const {
      wheelData,
      email,
      prizeLabel,
      prizeDescription,
      prizeValue,
      isFetchingPrize,
      wheelHasSpun 
    } = this.state;

    if (!wheelData) return <Spinner />;
    if (isFetchingPrize) return <Spinner />;
    if (prizeValue && wheelHasSpun) {
      return (
        <Prize
          prizeLabel={prizeLabel}
          prizeDescription={prizeDescription}
          prizeValue={prizeValue}
          callToAction="Continue & Use Discount"
          onAccept={this.acceptPrize}
        />
      );
    }
    if (prizeValue) return null;

    return (
      <Form
        email={email}
        callToAction='Try your luck'
        onChangeEmail={this.onChangeEmail}
        onSubmit={this.onFormSubmit}
      />
    );
  };

  render() {
    const { isPreview } = this.props;
    const { wheelData, formError } = this.state;

    return (
      <div>
        {isPreview && <PreviewBadge />}
        <CloseButton onClick={this.closePopup} />
        <div className="wheel-flex-container">
          <div className="wheel-column">
            {
              wheelData &&
              <Wheel
                wheelBaseColor={wheelData['wheel_base_color']}
                colorizeWheel={wheelData['colorize_wheel']}
                segments={wheelData['segments']}
                onCreateWheel={this.onCreateWheel}
                afterSpinWheel={this.afterSpinWheel}
              />
            }
          </div>
          <div className="form-column">
            {
              formError &&
              <div className="alert alert-danger" role="alert">{formError}</div>
            }

            {this.currentFormComponent()}
          </div>
        </div>
      </div>
    );
  }
}
