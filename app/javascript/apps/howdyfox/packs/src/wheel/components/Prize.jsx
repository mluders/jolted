import React from 'react'
import PropTypes from 'prop-types';

export default class Prize extends React.Component {
  static propTypes = {
    prizeLabel: PropTypes.string.isRequired,
    prizeDescription: PropTypes.string.isRequired,
    prizeValue: PropTypes.string.isRequired
  }

  render() {
    const { prizeLabel, prizeDescription, prizeValue, callToAction, onAccept } = this.props;

    return(
      <div>
        <h1 className="popup-header">You've hit <b>{prizeLabel}</b>. Woohoo!</h1>
        <p>Don't forget to use the coupon at checkout.</p>
        <div className='form-group'>
          <input className="form-control" value={prizeValue} readOnly></input>
        </div>
        <button className="btn btn-block btn-primary" onClick={onAccept}>{callToAction}</button>
        <small>{prizeDescription}</small>
      </div>
    );
  }
}