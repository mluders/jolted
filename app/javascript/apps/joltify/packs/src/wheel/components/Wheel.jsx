import React from 'react';
import PropTypes from 'prop-types';

const wheelStyle = {
  height: '100vh',
  left: '-40vh',
  position: 'fixed',
  transform: 'rotate(90deg)'
};

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
    console.log(segments);

    return segments.map((s) => {
      return ({
        'fillStyle': '#eae56f',
        'textFillStyle': '#ffffff',
        'text': s.label
      });
    });
  }

  createWheel = () => {
    const { segments } = this.props.wheelData;

    const wheel = new Winwheel({
      'canvasId'     : 'wheel-canvas',
      'numSegments'  : segments.length,
      'outerRadius'  : 700,
      'textFontSize' : 48,
      'lineWidth'    : 0.0001,
      'segments'     : this.generateSegments(),
      'animation'    :
      {
        'type'     : 'spinToStop',
        'duration' : 5,
        'spins'    : 8,
        'callbackFinished' : this.props.afterSpinWheel
      },
      'pins':
      {
        'number'      : segments.length,
        'outerRadius' : 15,
        'margin'      : 0,
        'fillStyle'   : '#333333',
        'strokeStyle' : '#333333'
      }
    });

    this.props.onCreateWheel(wheel);
  };

  render() {
    return (
      <div>
        <canvas id="wheel-canvas" className="wheel-canvas" width="1500" height="1500" style={wheelStyle}>
          Canvas not supported, use another browser.
        </canvas>
      </div>
    );
  }
}