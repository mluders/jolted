import React from 'react'

export default function ActionBar(props) {
  const { callToAction, onAction, performingAction } = props;

  return (
    <nav className="navbar fixed-bottom navbar-expand-sm navbar-light bg-light">
      <div className="container">
        <ul className="navbar-nav ml-auto my-1">
          <li className="nav-item active">
            <button className="btn btn-lg btn-primary" onClick={onAction} disabled={performingAction}>
              {performingAction && <span className="spinner-border spinner-border-sm mr-2"></span>}
              {callToAction}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
