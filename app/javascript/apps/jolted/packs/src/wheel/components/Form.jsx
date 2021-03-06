import React from 'react'
import PropTypes from 'prop-types';

export default class Form extends React.Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    callToAction: PropTypes.string.isRequired,
    onChangeEmail: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      emailError: ''
    };
  }

  onChangeEmail = (event) => {
    const email = event.target.value;

    this.setState({
      ...this.state,
      emailError: ''
    }, () => this.props.onChangeEmail(email));
  };

  validateForm = () => {
    let valid = true;
    const { email } = this.props;
    let emailError;

    if (!this.validateEmail(email)) {
      emailError = 'Please enter a valid email';
      valid = false
    }

    this.setState({
      ...this.state,
      emailError
    });

    return valid;
  };

  validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.validateForm()) this.props.onSubmit();
  }

  render() {
    const { callToAction } = this.props;
    const { email } = this.props;
    const { emailError } = this.state;

    return (
      <div>
        <form>
          <h1 className="popup-header-text">Spin the wheel.</h1>
          <p>Win an exclusive coupon code to our shop.</p>
          <div className='form-group'>
            <input
              type='email'
              className={`form-control ${emailError ? 'is-invalid' : ''}`}
              placeholder='Please enter your email'
              defaultValue={email}
              onChange={this.onChangeEmail}
            ></input>
          </div>
          <button
            className='btn btn-block btn-primary'
            onClick={this.onSubmit}
          >
            {callToAction}
          </button>
        </form>
        
      </div>
    );
  }
}