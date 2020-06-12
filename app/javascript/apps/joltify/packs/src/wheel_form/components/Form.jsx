import React from 'react'
import ActionBar from './ActionBar';
import Section from './Section';
import SegmentTable from './SegmentTable';

export default function Form(props) {
  const { isSubmitting, wheel, changeSegment, onSave } = props;

  return (
    <div>
      <Section
        title='Coupon Segments'
        description='Define your segments'
      >
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
