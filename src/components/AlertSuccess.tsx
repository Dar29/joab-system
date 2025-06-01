import React from 'react';
import { Alert } from 'antd';

interface AlertSuccessProps {
  message: string;
}

const AlertSuccess: React.FC<AlertSuccessProps> = ({ message }) => (
  <>
    <Alert
      message="Success"
      description={message}
      type="success"
      showIcon
    />
  </>
);

export default AlertSuccess;