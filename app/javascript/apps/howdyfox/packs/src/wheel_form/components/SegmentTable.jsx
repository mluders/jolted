import React from 'react';
import Card from './Card';
import SegmentLabel from './SegmentLabel';
import SegmentDiscount from './SegmentDiscount';

export default function SegmentTable(props) {
  const toPercentage = (x) => {
    return `${Math.ceil(x * 100)}%`;
  }

  const segmentComponents = () => {
    const { isSubmitting, wheel, changeSegment } = props;
    const totalGravity = wheel.wheelSegments.map((segment) => parseInt(segment.gravity)).reduce((a, b) => a + b);

    return wheel.wheelSegments.map((segment, index) => {  
      return (
        <tr key={index} className="px-5">
          <th scope="row" className="pt-3">{index + 1}</th>

          <td>
            <SegmentLabel
              isSubmitting={isSubmitting}
              segment={segment}
              segmentIndex={index}
              changeSegment={changeSegment}
            />
          </td>

          <td>
            {
              segment.outcome == 'winning' &&
              <SegmentDiscount
                isSubmitting={isSubmitting}
                segment={segment}
                segmentIndex={index}
                useDynamicDiscountCodes={wheel.useDynamicDiscountCodes}
                changeSegment={changeSegment}
              />
            }
          </td>

          <td>
            {
              segment.outcome == 'winning' &&
              <span>
                <select
                  className="form-select"
                  style={{ minWidth: '100px' }}
                  value={segment.gravity}
                  onChange={(e) => changeSegment(index, 'gravity', e.target.value)}
                >
                  <option>0</option>
                  <option>10</option>
                  <option>20</option>
                  <option>30</option>
                  <option>40</option>
                  <option>50</option>
                  <option>60</option>
                  <option>70</option>
                  <option>80</option>
                  <option>90</option>
                  <option>100</option>
                </select>
              </span>
            }
          </td>

          <td className="pt-3">
            {segment.outcome == 'winning' && toPercentage(segment.gravity / totalGravity)}
          </td>
        </tr>
      );
    });
  }

  return (
    <Card title="Coupon Segments">
      <div className="table-responsive">
        <table className="table table-borderless table-striped-even">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col" style={{width: '200px !important'}}>Label</th>
              <th scope="col">{props.wheel.useDynamicDiscountCodes ? 'Discount' : 'Raw Discount Code'}</th>
              <th scope="col">Gravity</th>
              <th scope="col">Likelihood</th>
            </tr>
          </thead>
          <tbody>
            {segmentComponents()}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
