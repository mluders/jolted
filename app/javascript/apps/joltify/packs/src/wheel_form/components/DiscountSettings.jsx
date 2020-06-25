import React from 'react';
import Card from './Card';

export default function DiscountSettings(props) {
  const { isSubmitting, wheel, changeWheel } = props;
  const { useDynamicDiscountCodes, discountDuration } = wheel;
  const { discountDuration: discountDurationErrors } = wheel.errors;
  const discountDurationError = (
    !isSubmitting && discountDurationErrors && discountDurationErrors.length > 0 ?
    discountDurationErrors[0] : null
  );

  const discountDurationOptions = () => {
    const minutes = [
      ['', ''],
      ['15 minutes', '15'],
      ['30 minutes', '30'],
      ['1 day', '1440'],
      ['2 days', '2880'],
      ['3 days', '4320']
    ];
    return minutes.map((minute) => <option key={minute[1]} value={minute[1]}>{minute[0]}</option>)
  }

  const toggleDynamicDiscountCodes = () => {
    changeWheel('useDynamicDiscountCodes', !useDynamicDiscountCodes);
  };

  const handleDiscountDurationChange = (e) => {
    changeWheel('discountDuration', e.target.value);
  }

  return (
    <Card title="Discount Settings">
      <div>
        <div className="form-check form-switch">
          <input className="form-check-input"
            type="checkbox"
            checked={useDynamicDiscountCodes}
            onChange={toggleDynamicDiscountCodes}
          ></input>
          <label className="form-check-label">
            Use dynamic coupon codes
          </label>
        </div>
      </div>

      {
        useDynamicDiscountCodes &&
        <table className="mt-4">
          <tbody>
            <tr>
              <td>
                Coupons should expire after
              </td>
              <td>
                <select
                  style={{ minWidth: '200px' }}
                  className={`form-select ml-2 ${discountDurationError ? 'is-invalid' : ''}`}
                  value={discountDuration || ''}
                  onChange={handleDiscountDurationChange}
                >
                  {discountDurationOptions()}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      }
    </Card>
  );
}
