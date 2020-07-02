import React from 'react'
import ActionBar from './ActionBar';
import General from './General';
import Branding from './Branding';
import DiscountSettings from './DiscountSettings';
import SegmentTable from './SegmentTable';

export default function Form(props) {
  const {
    isSubmitting,
    wheel,
    changeWheel,
    changeSegment,
    onSave
  } = props;

  return (
    <div>
      <General
        live={wheel.live}
        changeWheel={changeWheel}
      />

      <Branding
        wheel={wheel}
        changeWheel={changeWheel}
        popupBackgroundColor={wheel.popupBackgroundColor}
        popupFontColor={wheel.popupFontColor}
        popupAccentColor={wheel.popupAccentColor}
        wheelBaseColor={wheel.wheelBaseColor}
        colorizeWheel={wheel.colorizeWheel}
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
