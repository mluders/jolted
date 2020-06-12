import React from 'react'

export default function Card(props) {
  return (
    <div className="card">
      <div className="card-body">
        {props.children}
      </div>
    </div>
  );
};
