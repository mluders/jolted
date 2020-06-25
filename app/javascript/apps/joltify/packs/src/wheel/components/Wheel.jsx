import React from 'react';
import PropTypes from 'prop-types';
import './wheel.css';
import { adjustColor } from '../color_utils';

export default class Wheel extends React.Component {
  DEFAULT_SEGMENT_COLORS = [
    '#2914db',
    '#ff0160',
    '#000000'
  ];

  static propTypes = {
    wheelData: PropTypes.object.isRequired,
    onCreateWheel: PropTypes.func.isRequired,
    afterSpinWheel: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.createWheel();
  }

  calculateSegmentColors = () => {
    const { wheelBaseColor, colorizeWheel } = this.props.wheelData;

    if (colorizeWheel) {
      return [
        adjustColor(wheelBaseColor, 30),
        wheelBaseColor,
        adjustColor(wheelBaseColor, -30)
      ];
    }

    return this.DEFAULT_SEGMENT_COLORS;
  }

  calculatePinColor = () => {
    const segmentColors = this.calculateSegmentColors();
    if (!segmentColors) return 'aqua';

    return adjustColor(segmentColors[0], 25)
  }

  generateInnerSegments = () => {
    const { segments } = this.props.wheelData;
    const colors = this.calculateSegmentColors();

    return segments.map((s, index) => {
      const color = colors[index % colors.length];
      return ({
        'fillStyle': color,
        'strokeStyle': color,
        'textFillStyle': '#ffffff',
        'text': s.label
      });
    });
  }

  generateBorderSegments = () => {
    const { segments } = this.props.wheelData;

    return segments.map((s) => {
      return ({
        'fillStyle': '#ffffff',
        'strokeStyle': '#ffffff'
      });
    });
  }

  createWheel = () => {
    const { segments } = this.props.wheelData;

    const innerWheel = new Winwheel({
      'canvasId'     : 'wheel-canvas',
      'numSegments'  : segments.length,
      'outerRadius'  : 630,
      'innerRadius'  : 100,
      'textFontSize' : 48,
      'lineWidth'    : 1,
      'segments'     : this.generateInnerSegments(),
    });

    const borderWheel = new Winwheel({
      'canvasId'     : 'wheel-canvas',
      'numSegments'  : segments.length,
      'outerRadius'  : 670,
      'textFontSize' : 48,
      'lineWidth'    : 1,
      'segments'     : this.generateBorderSegments(),
      'animation'    : {
        'type'     : 'spinToStop',
        'duration' : 10,
        'spins'    : 16,
        'callbackAfter': () => {
          innerWheel.rotationAngle = borderWheel.rotationAngle;
          innerWheel.draw(false);
          drawPointer();
        },
        'callbackFinished': this.props.afterSpinWheel
      }
    });

    const drawPointer = () =>
    {
      const canvas = document.getElementById('wheel-canvas');
      let ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.strokeStyle = 'white';
      ctx.fillStyle   = this.calculatePinColor();
      ctx.lineWidth   = 25;
      ctx.beginPath();
      ctx.moveTo(800, 50);
      ctx.lineTo(750, 175);
      ctx.lineTo(700, 50);
      ctx.closePath();
      ctx.shadowColor = 'rgba(0,0,0,0.2)';
      ctx.shadowBlur = 25;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fill();
    }

    borderWheel.draw();
    innerWheel.draw(false);
    drawPointer()


    this.props.onCreateWheel(borderWheel);
  };

  render() {
    return (
      <div>
        <canvas id="wheel-canvas" className="wheel-canvas" width="1500" height="1500">
          Canvas not supported, use another browser.
        </canvas>
      </div>
    );
  }
}