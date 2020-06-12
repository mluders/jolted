import React from 'react'

export default function Section(props) {
  return (
    <div className="row mb-5">
      <div className="col-12 col-sm-3">
        <h3>{props.title}</h3>
        <p>{props.description}</p>
      </div>
      <div className="col-12 col-sm-9">
        {props.children}
      </div>
    </div>
  );
};
