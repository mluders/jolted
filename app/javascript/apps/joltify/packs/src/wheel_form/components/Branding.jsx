import React from 'react';
import Card from './Card';
import ColorPicker from './ColorPicker';

export default function Branding(props) {
  const {
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

  return (
    <Card title="Branding">
      <table className="table table-borderless" style={{ maxWidth: '500px' }}>
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
            <td>Font color</td>
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
    </Card>
  );
}
