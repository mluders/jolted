import React from 'react';
import PropTypes from 'prop-types';

export default class Wheel extends React.Component {
  static propTypes = {
    onCreateWheel: PropTypes.func.isRequired,
    afterSpinWheel: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.createWheel();
  }

  createWheel = () => {
    const wheel = new Winwheel({
      'canvasId'     : 'wheel-canvas',
      'centerX'      : 30,
      'numSegments'  : 10,         // Number of segments
      'outerRadius'  : 212,       // The size of the wheel.
      'textFontSize' : 15,        // Font size.
      'lineWidth'    : 0.001,
  
      'segments'     :            // Definition of all the segments.
      [
        {'fillStyle' : '#eae56f', 'text' : 'Prize 1'},
        {'fillStyle' : '#89f26e', 'text' : 'Prize 2'},
        {'fillStyle' : '#7de6ef', 'text' : 'Prize 3'},
        {'fillStyle' : '#e7706f', 'text' : 'Prize 4'},
        {'fillStyle' : '#eae56f', 'text' : 'Prize 5'},
        {'fillStyle' : '#89f26e', 'text' : 'Prize 6'},
        {'fillStyle' : '#7de6ef', 'text' : 'Prize 7'},
        {'fillStyle' : '#e7706f', 'text' : 'Prize 8'},
        {'fillStyle' : '#7de6ef', 'text' : 'Prize 9'},
        {'fillStyle' : '#e7706f', 'text' : 'Prize 10'}
      ],
      'animation' :               // Definition of the animation
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