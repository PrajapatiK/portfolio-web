import React from 'react'

const Button = (props) => {
  const { text, onClick, btnClass, disabled = false } = props;
  let className = '';
  if (disabled) className = `${className} opacity-40`;

    return (
      <button className={`${btnClass} ${className}`} onClick={onClick} disabled={disabled}>{text}</button>
    )
}

export default Button