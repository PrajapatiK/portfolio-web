import moment from 'moment';
import React from 'react';
import { dateFormat } from '../../lib/common/constants';

const DateInput = (props) => {
  const { label, type, name, placeholder, value, onChange, readOnly = false, transparent = false, disabled = false } = props;
  let className = '';
  const dateValue = moment(value).format('YYYY-MM-DD');
  if (transparent) className = `${className} border-none m-0 p-0 outline-none bg-white`
  return (
    <span>
      <label>{label}</label>
      <input className={className} type={type} name={name} placeholder={placeholder} value={dateValue} onChange={onChange} readOnly={readOnly} disabled={disabled} />
    </span>
  )
}

export default DateInput;