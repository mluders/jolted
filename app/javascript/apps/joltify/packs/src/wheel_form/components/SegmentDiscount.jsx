import React from 'react'

const MIN_DISCOUNT_PERCENT = 5;
const MAX_DISCOUNT_PERCENT = 90;

export default function SegmentDiscount(props) {
  const { isSubmitting, segment, segmentIndex, useDynamicDiscountCodes, changeSegment } = props;
  const {
    discountPercent: discountPercentErrors,
    rawDiscountCode: rawDiscountCodeErrors
  } = segment.errors;
  const discountPercentError = (!isSubmitting && discountPercentErrors && discountPercentErrors.length > 0 ? discountPercentErrors[0] : null);
  const rawDiscountCodeError = (!isSubmitting && rawDiscountCodeErrors && rawDiscountCodeErrors.length > 0 ? rawDiscountCodeErrors[0] : null);

  const discountPercentOptions = () => {
    const percents = [''];

    for (let p = MIN_DISCOUNT_PERCENT; p <= MAX_DISCOUNT_PERCENT; p += MIN_DISCOUNT_PERCENT) {
      percents.push(p);
    }

    return percents.map((p) => <option key={p}>{p}</option>)
  }
  
  const handleDiscountPercentChange = (e) => {
    console.log(e.target.value);
    changeSegment(segmentIndex, 'discountPercent', e.target.value);
  }

  const handleRawDiscountCodeChange = (e) => {
    changeSegment(segmentIndex, 'rawDiscountCode', e.target.value);
  }

  return (
    <span>
      {
        useDynamicDiscountCodes &&
        <span>
          <div className="input-group">
            <select
              className={`custom-select ${discountPercentError ? 'is-invalid' : ''}`}
              value={segment.discountPercent}
              onChange={handleDiscountPercentChange}
            >
              {discountPercentOptions()}
            </select>
            <div className="input-group-append">
              <label className="input-group-text">%&nbsp;&nbsp;off</label>
            </div>
          </div>
          {discountPercentError && <small className="form-text text-danger">{discountPercentError}</small>}
        </span>
      }

      {
        !useDynamicDiscountCodes &&
        <span>
          <input
            className={`form-control ${rawDiscountCodeError ? 'is-invalid' : ''}`}
            onChange={handleRawDiscountCodeChange}
            value={segment.rawDiscountCode || ''}
          >
          </input>
          {rawDiscountCodeError && <small className="form-text text-danger">{rawDiscountCodeError}</small>}
        </span>
      }
    </span>
  );
};
