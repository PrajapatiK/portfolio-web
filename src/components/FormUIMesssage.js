import React from 'react';

const FormUIMesssage = ({ message, msgClass }) => {
  let messages;
  if (Array.isArray(message)) {
    messages = message.map(msg => <li>{msg}</li>);
  } else messages = message;
  return (
    <div className={msgClass}>
      {messages}
    </div>
  )
}

export default FormUIMesssage;