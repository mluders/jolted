import React from 'react'
import PropTypes from 'prop-types';
import Branding from './Branding';
import Segments from './Segments';

export default class Form extends React.Component {
  static propTypes = {
    wheel: PropTypes.object.isRequired,
    onSegmentChange: PropTypes.func.isRequired
  };

  render() {
    const { wheel, onSegmentChange } = this.props;

    return (
      <div>
        <div className="row mb-5">
          <div className="col-12 col-sm-3">
            Branding
          </div>
          <div className="col-12 col-sm-9">
            <Branding />
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-12 col-sm-3">
            Coupon segments
          </div>
          <div className="col-12 col-sm-9">
            <Segments
              wheelSegments={wheel.wheel_segments}
              onSegmentChange={onSegmentChange}
            />
          </div>
        </div>
      </div>
    );
  }
}
