import React from 'react';
import PropTypes from 'prop-types';

export default class Wheel extends React.Component {
  static propTypes = {
    wheelData: PropTypes.object.isRequired,
    onCreateWheel: PropTypes.func.isRequired,
    afterSpinWheel: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.createWheel();
  }

  generateSegments = () => {
    const { segments } = this.props.wheelData;

    return segments.map((s) => {
      return ({ 'fillStyle' : '#eae56f', 'text' : s.label });
    });
  }

  createWheel = () => {
    const wheel = new Winwheel({
      'canvasId'     : 'wheel-canvas',
      'centerX'      : 30,
      'numSegments'  : 10,
      'outerRadius'  : 212,
      'textFontSize' : 15,
      'lineWidth'    : 0.001,
      'segments'     : this.generateSegments(),
      'animation'    :
      {
        'type'     : 'spinToStop',
        'duration' : 5,
        'spins'    : 8,
        'callbackFinished' : this.props.afterSpinWheel
      }
    });

    this.props.onCreateWheel(wheel);
  };

  render() {
    return (
      <div>
        <canvas id='wheel-canvas' className='wheel-canvas' width='500' height='500'>
          Canvas not supported, use another browser.
        </canvas>
      </div>
    );
  }
}