import React from 'react'
import ActionBar from './ActionBar';
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
      <Branding
        changeWheel={changeWheel}
        popupBackgroundColor={wheel.popupBackgroundColor}
        popupFontColor={wheel.popupFontColor}
        popupAccentColor={wheel.popupAccentColor}
      />

      <DiscountSettings
        useDynamicDiscountCodes={wheel.useDynamicDiscountCodes}
        changeWheel={changeWheel}
      />

      <SegmentTable
        isSubmitting={isSubmitting}
        wheel={wheel}
        changeSegment={changeSegment}
      />

      <ActionBar callToAction='Save Wheel' onAction={onSave} performingAction={isSubmitting} />
    </div>
  );
}
