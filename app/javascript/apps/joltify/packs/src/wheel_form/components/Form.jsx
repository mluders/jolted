import React from 'react'
import ActionBar from './ActionBar';
import Section from './Section';
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
      <Section title='Branding'>
        <Branding
          changeWheel={changeWheel}
          popupBackgroundColor={wheel.popupBackgroundColor}
          popupFontColor={wheel.popupFontColor}
          popupAccentColor={wheel.popupAccentColor}
        />
      </Section>

      <Section title='Coupon settings'>
        <DiscountSettings
          useDynamicDiscountCodes={wheel.useDynamicDiscountCodes}
          changeWheel={changeWheel}
        />
      </Section>

      <Section title='Coupon Segments' description='Define your segments'>
        <SegmentTable
          isSubmitting={isSubmitting}
          wheel={wheel}
          changeSegment={changeSegment}
        />
      </Section>

      <ActionBar callToAction='Save' onAction={onSave} performingAction={isSubmitting} />
    </div>
  );
}
