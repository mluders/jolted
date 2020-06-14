import React from 'react'

export default function Section(props) {
  const { title, description, children } = props;

  return (
    <div className="row mb-5">
      <div className="col-12 col-sm-3">
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
      <div className="col-12 col-sm-9">
        {children}
      </div>
    </div>
  );
};
