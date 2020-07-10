import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import ColorPicker from './ColorPicker';
import ImagePicker from './ImagePicker';
import SimpleWheel from '../../shared/components/SimpleWheel';

Appearance.propTypes = {
  wheel: PropTypes.object.isRequired,
  changeWheel: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  popupBackgroundColor: PropTypes.string.isRequired,
  popupFontColor: PropTypes.string.isRequired,
  popupAccentColor: PropTypes.string.isRequired,
  wheelBaseColor: PropTypes.string.isRequired,
  colorizeWheel: PropTypes.bool.isRequired,
  backgroundImageUrl: PropTypes.string
}

export default function Appearance(props) {
  const {
    wheel,
    changeWheel,
    uploadImage,
    popupBackgroundColor,
    popupFontColor,
    popupAccentColor,
    wheelBaseColor,
    colorizeWheel,
    backgroundImageUrl
  } = props;

  const changePopupBackgroundColor = (color) => {
    changeWheel('popup_background_color', color)
  };

  const changePopupFontColor = (color) => {
    changeWheel('popup_font_color', color)
  };

  const changePopupAccentColor = (color) => {
    changeWheel('popup_accent_color', color)
  };

  const changeWheelBaseColor = (color) => {
    changeWheel('wheel_base_color', color)
  };

  const toggleColorizeWheel = () => {
    changeWheel('colorize_wheel', !colorizeWheel);
  };

  const changeBackgroundImageUrl = (imageUrl) => {
    changeWheel('background_image_url', imageUrl)
  }

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
          <h5 className="card-title">Colors</h5>
          <div className="pl-4">
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

          <hr></hr>

          <h5 className="card-title">Background image</h5>
          <div className="pl-4">
            <ImagePicker
              imageUrl={backgroundImageUrl}
              changeImageUrl={changeBackgroundImageUrl}
              uploadImage={uploadImage}
              maxFileSize={1024*1024}
            />
          </div>

          {/* <hr></hr>

          <h5 className="card-title">Wheel logo</h5>
          <div className="pl-4">
            <ImagePicker
              maxFileSize={1024*50}
            />
          </div> */}


        </div>
        <div className="col-12 col-md-6">
          <SimpleWheel
            segments={wheel['wheel_segments']}
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
