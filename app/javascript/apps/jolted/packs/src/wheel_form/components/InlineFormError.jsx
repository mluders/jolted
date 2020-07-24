import React from 'react'

export default function InlineFormError(props) {
  const { message } = props;
  if (message) return <small className="form-text text-danger">{message}</small>;
  return null;
}
