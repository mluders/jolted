import React from 'react';
import Card from './Card';

export default function DiscountSettings(props) {
  const { useDynamicDiscountCodes, changeWheel } = props;

  const toggleDynamicDiscountCodes = () => {
    changeWheel('useDynamicDiscountCodes', !useDynamicDiscountCodes);
  };

  return (
    <Card title="Discount Settings">
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
    </Card>
  );
}
