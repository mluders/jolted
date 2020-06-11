import React from 'react'
import PropTypes from 'prop-types';

export default class Segments extends React.Component {
  static propTypes = {
    wheelSegments: PropTypes.array.isRequired,
    onSegmentChange: PropTypes.func.isRequired
  };

  toPercentage = (x) => {
    return `${Math.ceil(x * 100)}%`;
  }

  wheelSegmentComponents = () => {
    const { wheelSegments, onSegmentChange } = this.props;
    const totalGravity = wheelSegments.map((segment) => parseInt(segment.gravity)).reduce((a, b) => a + b);
    console.log(totalGravity);

    return wheelSegments.map((segment, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>

          <td>
            <input
              placeholder="Label"
              className="form-control"
              readOnly={segment.outcome == 'losing'}
              value={segment.label || ''}
              onChange={(e) => onSegmentChange(index, 'label', e.target.value)}
            />
          </td>

          <td>
            {
              segment.outcome == 'winning' &&
              <span>
                <select
                  className="form-control"
                  value={segment.gravity}
                  onChange={(e) => onSegmentChange(index, 'gravity', e.target.value)}
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
            {
              segment.outcome == 'winning' &&
              this.toPercentage(segment.gravity / totalGravity)
            }
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="card">
        <div className="card-body">
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
              {this.wheelSegmentComponents()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
