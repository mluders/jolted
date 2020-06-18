import React from 'react'
import InlineFormError from './InlineFormError';

export default function SegmentLabel(props) {
  const { isSubmitting, segment, segmentIndex, changeSegment } = props;
  const { label: labelErrors } = segment.errors;
  const labelError = (!isSubmitting && labelErrors && labelErrors.length > 0 ? labelErrors[0] : null);


  if (segment.outcome == 'winning') {
    return <span>
      <input
        className={`form-control ${labelError ? 'is-invalid' : ''}`}
        style={{ minWidth: '250px' }}
        value={segment.label || ''}
        onChange={(e) => changeSegment(segmentIndex, 'label', e.target.value)}
      />
      <InlineFormError message={labelError} />
    </span>
  }

  return <p className="text-muted my-2" style={{ minWidth: '250px' }}>{segment.label}</p>
};
