import React from 'react'

export default function ActionBar(props) {
  const {
    callToAction,
    onAction,
    performingAction,
  } = props;

  return (
    <div className="text-center mb-5">
      <a  href="/" className="btn btn-light" disabled={performingAction}>
        Cancel
      </a>
      <button className="btn btn-primary ml-4" onClick={onAction} disabled={performingAction}>
        {performingAction && <span className="spinner-border spinner-border-sm mr-2"></span>}
        {callToAction}
      </button>
    </div>
  );
}
