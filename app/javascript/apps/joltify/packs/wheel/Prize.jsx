import React from 'react'
import PropTypes from 'prop-types';

export default class Prize extends React.Component {
  static propTypes = {
    prize: PropTypes.string.isRequired
  }

  render() {
    const { prize } = this.props;

    return(
      <div>
        <h1>Winner!</h1>
        <p>{prize}</p>
      </div>
    );
  }
}