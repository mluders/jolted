import React from 'react'
import PropTypes from 'prop-types';

export default class Form extends React.Component {
  static propTypes = {
    callToAction: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      email: 'fake@fake.com',
      emailError: ''
    };
  }

  onChangeEmail = (event) => {
    this.setState({
      ...this.state,
      email: event.target.value,
      emailError: ''
    });
  };

  validateForm = () => {
    let valid = true;
    const { email } = this.state;
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
    const { email } = this.state;
    if (this.validateForm()) this.props.onSubmit(email);
  }

  render() {
    const { callToAction } = this.props;
    const { email, emailError } = this.state;

    return (
      <div>
        <form>
          <h1>Spin the wheel.</h1>
          <p>Win an exclusive coupon code to our shop.</p>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              placeholder='Please enter your email'
              value={email}
              onChange={this.onChangeEmail}
            ></input>
            <small className="text-danger">{emailError}</small>
          </div>
          <button
            className='btn btn-primary'
            onClick={this.onSubmit}
          >
            {callToAction}
          </button>
        </form>
        
      </div>
    );
  }
}