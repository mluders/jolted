import React from 'react';
import PropTypes from 'prop-types';
import { adjustColor } from '../../shared/color_utils';
import './wheel.css';

export default class Wheel extends React.Component {
  DEFAULT_SEGMENT_COLORS = [
    '#2914db',
    '#ff0160',
    '#000000'
  ];

  WHEEL_RADIUS = 670;

  static propTypes = {
    segments: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired
      })
    ).isRequired,
    wheelBaseColor: PropTypes.string.isRequired,
    colorizeWheel: PropTypes.bool.isRequired,
    onCreateWheel: PropTypes.func,
    afterSpinWheel: PropTypes.func
  }

  componentDidMount() {
    this.createWheel();
  }

  calculateSegmentColors = () => {
    const { wheelBaseColor, colorizeWheel } = this.props;

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
    const { segments } = this.props;
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

  createWheel = () => {
    const { segments, onCreateWheel, afterSpinWheel } = this.props;

    const innerWheel = new Winwheel({
      'canvasId'     : 'wheel-canvas',
      'numSegments'  : segments.length,
      'outerRadius'  : this.WHEEL_RADIUS - 40,
      'innerRadius'  : 100,
      'textFontSize' : 48,
      'lineWidth'    : 1,
      'segments'     : this.generateInnerSegments(),
      'animation'    : {
        'type'     : 'spinToStop',
        'duration' : 10,
        'spins'    : 16,
        'callbackBefore': () => {
          drawShadow();
        },
        'callbackAfter': () => {
          drawPointer();
        },
        'callbackFinished': afterSpinWheel
      }
    });

    const drawShadow = () => {
      const canvas = document.getElementById('wheel-canvas');
      let ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.save();
      ctx.beginPath();
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 50;
      ctx.shadowOffsetX = 10;
      ctx.shadowOffsetY = -10;
      ctx.lineWidth = 50;
      ctx.fillStyle = "white";
      ctx.arc(canvas.width / 2, canvas.height / 2, this.WHEEL_RADIUS, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }

    const drawPointer = () =>
    {
      const canvas = document.getElementById('wheel-canvas');
      let ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.save();
      ctx.strokeStyle = 'white';
      ctx.fillStyle   = this.calculatePinColor();
      ctx.lineWidth   = 25;
      ctx.beginPath();
      ctx.moveTo(800, 50);
      ctx.lineTo(750, 175);
      ctx.lineTo(700, 50);
      ctx.closePath();
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 40;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.fill();
      ctx.restore();
    }

    drawShadow();
    innerWheel.draw(false);
    drawPointer();

    if (onCreateWheel) onCreateWheel(innerWheel);
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