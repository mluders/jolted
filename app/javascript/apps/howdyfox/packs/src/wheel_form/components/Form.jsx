import React from 'react'
import ActionBar from './ActionBar';
import General from './General';
import Appearance from './Appearance';
import DiscountSettings from './DiscountSettings';
import SegmentTable from './SegmentTable';

export default function Form(props) {
  const {
    isSubmitting,
    wheel,
    changeWheel,
    changeSegment,
    uploadImage,
    onSave
  } = props;

  return (
    <div>
      <General
        live={wheel['live']}
        changeWheel={changeWheel}
      />

      <Appearance
        wheel={wheel}
        changeWheel={changeWheel}
        uploadImage={uploadImage}
        popupBackgroundColor={wheel['popup_background_color']}
        popupFontColor={wheel['popup_font_color']}
        popupAccentColor={wheel['popup_accent_color']}
        wheelBaseColor={wheel['wheel_base_color']}
        colorizeWheel={wheel['colorize_wheel']}
        backgroundImageUrl={wheel['background_image_url']}
      />

      <DiscountSettings
        isSubmitting={isSubmitting}
        wheel={wheel}
        changeWheel={changeWheel}
      />

      <SegmentTable
        isSubmitting={isSubmitting}
        wheel={wheel}
        changeSegment={changeSegment}
      />

      <ActionBar
        callToAction="Save Wheel"
        onAction={onSave}
        performingAction={isSubmitting}
      />
    </div>
  );
}
