import React from 'react';

const Input = (props) => {
  const { label, type, name, placeholder, value, onChange, readOnly = false, transparent = false, disabled = false } = props;
  
  let className = '';
  if (transparent) className = `${className} border-none m-0 p-0 outline-none bg-white`

  return (
    <span>
      <label>{label}</label>
      <input className={className} type={type} name={name} placeholder={placeholder} value={value} onChange={onChange} readOnly={readOnly} disabled={disabled} />
    </span>
  )
}

export default Input;