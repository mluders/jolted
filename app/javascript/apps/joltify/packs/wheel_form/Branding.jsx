import React from 'react'
import PropTypes from 'prop-types';

export default class Branding extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <table className="table">
            <tbody>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
              <tr>
                <td>Larry</td>
                <td>the Bird</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
