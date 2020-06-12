import React from 'react'
import Card from './Card';

export default function SegmentTable(props) {
  const toPercentage = (x) => {
    return `${Math.ceil(x * 100)}%`;
  }

  const segmentComponents = () => {
    const { isSubmitting, wheel, changeSegment } = props;
    const totalGravity = wheel.wheelSegments.map((segment) => parseInt(segment.gravity)).reduce((a, b) => a + b);

    return wheel.wheelSegments.map((segment, index) => {
      const { label: labelErrors } = segment.errors;
      const labelError = (!isSubmitting && labelErrors && labelErrors.length > 0 ? labelErrors[0] : null);

      return (
        <tr key={index}>
        <td>{index + 1}</td>

        <td>
          <input
            placeholder="Label"
            className={`form-control ${labelError ? 'is-invalid' : ''}`}
            readOnly={segment.outcome == 'losing'}
            value={segment.label || ''}
            onChange={(e) => changeSegment(index, 'label', e.target.value)}
          />
          {labelError && <small className="form-text text-danger">{labelError}</small>}
        </td>

        <td>
          {
            segment.outcome == 'winning' &&
            <span>
              <select
                className="form-control"
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

        <td>
          {segment.outcome == 'winning' && toPercentage(segment.gravity / totalGravity)}
        </td>
      </tr>
      );
    });
  }

  return (
    <Card>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Label</th>
            <th scope="col">Gravity</th>
            <th scope="col">Likelihood</th>
          </tr>
        </thead>
        <tbody>
          {segmentComponents()}
        </tbody>
      </table>
    </Card>
  );
};
