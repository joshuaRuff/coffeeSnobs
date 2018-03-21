import React from 'react';
import { Alert as AntAlert } from 'antd';

const Alert = ({
  message = 'No Message Set',
  type = 'warning',
  closable = true,
  active = false,
}) => {
  if (active) {
    return (
      <AntAlert
        message={message}
        type={type}
        closable={closable}
      />
    );
  }

  return null;
};

export default Alert;
