import React from 'react';
import Card from './Card';
import ColorPicker from './ColorPicker';

export default function Branding(props) {
  const {
    changeWheel,
    popupBackgroundColor,
    popupFontColor,
    popupAccentColor
  } = props;

  const changePopupBackgroundColor = (color) => {
    changeWheel('popupBackgroundColor', color)
  }

  const changePopupFontColor = (color) => {
    changeWheel('popupFontColor', color)
  }

  const changePopupAccentColor = (color) => {
    changeWheel('popupAccentColor', color)
  }


  return (
    <Card title="Branding">
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
        </tbody>
      </table>
    </Card>
  );
}
