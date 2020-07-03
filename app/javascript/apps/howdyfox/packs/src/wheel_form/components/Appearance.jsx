import React from 'react';
import Card from './Card';
import ColorPicker from './ColorPicker';
import SimpleWheel from '../../shared/components/SimpleWheel';

export default function Appearance(props) {
  const {
    wheel,
    changeWheel,
    popupBackgroundColor,
    popupFontColor,
    popupAccentColor,
    wheelBaseColor,
    colorizeWheel
  } = props;

  const changePopupBackgroundColor = (color) => {
    changeWheel('popupBackgroundColor', color)
  };

  const changePopupFontColor = (color) => {
    changeWheel('popupFontColor', color)
  };

  const changePopupAccentColor = (color) => {
    changeWheel('popupAccentColor', color)
  };

  const changeWheelBaseColor = (color) => {
    changeWheel('wheelBaseColor', color)
  };

  const toggleColorizeWheel = () => {
    changeWheel('colorizeWheel', !colorizeWheel);
  };

  const buttonStyle = {
    color: 'white',
    backgroundColor: popupAccentColor,
    borderColor: popupAccentColor
  };

  const textStyle = {
    color: popupFontColor
  };

  return (
    <Card title="Appearance">
      <div className="row">
        <div className="col-12 col-md-6">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>Background color</td>
                <td>
                  <ColorPicker
                    currentColor={popupBackgroundColor}
                    onChange={changePopupBackgroundColor}
                  />
                </td>
              </tr>
              <tr>
                <td>Text color</td>
                <td>
                  <ColorPicker
                    currentColor={popupFontColor}
                    onChange={changePopupFontColor}
                  />
                </td>
              </tr>
              <tr>
                <td>Accent color</td>
                <td>
                  <ColorPicker
                    currentColor={popupAccentColor}
                    onChange={changePopupAccentColor}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <div className="form-check form-switch">
                    <input className="form-check-input"
                      type="checkbox"
                      checked={colorizeWheel}
                      onChange={toggleColorizeWheel}
                    ></input>
                    <label className="form-check-label">
                      Colorize wheel
                    </label>
                  </div>
                </td>
                <td>
                  {
                    colorizeWheel &&
                    <ColorPicker
                      currentColor={wheelBaseColor}
                      onChange={changeWheelBaseColor}
                    />
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-12 col-md-6">
          <SimpleWheel
            segments={wheel.wheelSegments}
            backgroundColor={popupBackgroundColor}
            wheelBaseColor={wheelBaseColor}
            colorizeWheel={colorizeWheel}
          >
            <h1 className="mb-3" style={textStyle}>Example Text</h1>
            <button className="btn btn-primary mb-3" style={buttonStyle}>Example Button</button>
          </SimpleWheel>
        </div>
      </div>
    </Card>
  );
}
