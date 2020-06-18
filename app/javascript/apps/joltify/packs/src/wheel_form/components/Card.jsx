import React from 'react'

export default function Card(props) {
  return (
    <div className="card mb-4">
      <div className="card-header">
        {props.title}
      </div>
      <div className="card-body" style={props.bodyStyle}>
        {props.children}
      </div>
    </div>
  );
};
