import React from 'react'

export default function ActionBar(props) {
  const { callToAction, onAction, performingAction } = props;

  return (
    <div className="mb-5">
      <button className="btn btn-lg btn-primary" onClick={onAction} disabled={performingAction}>
        {performingAction && <span className="spinner-border spinner-border-sm mr-2"></span>}
        {callToAction}
      </button>
    </div>
  );
}
