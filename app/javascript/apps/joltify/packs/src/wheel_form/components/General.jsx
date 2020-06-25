import React from 'react';
import Card from './Card';

export default function General(props) {
  const { live, changeWheel } = props;

  const toggleLive = () => {
    changeWheel('live', !live);
  };

  const alertComponent = () => {
    if (live) {
      return <div className="alert alert-warning mt-3 mb-0 py-2" role="alert">
        After saving, this wheel will be live.
      </div>
    }

    return <div className="alert alert-secondary mt-3 mb-0 py-2" role="alert">
      After saving, this wheel will be NOT be live.
    </div>
  }

  return (
    <Card title="General">
      <div className="form-check form-switch">
        <input className="form-check-input"
          type="checkbox"
          checked={live}
          onChange={toggleLive}
        ></input>
        <label className="form-check-label">
          Live
        </label>
      </div>

      {alertComponent()}
    </Card>
  );
}
