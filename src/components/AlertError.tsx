import React from 'react';
import { Alert } from 'antd';
import { Padding } from '@mui/icons-material';

interface AlertErrorProps {
  message: string;
}

const AlertError: React.FC<AlertErrorProps> = ({ message }) => (
  <>
    <Alert
      message="Error"
      description={message}
      type="error"
      style={{ marginBottom: 15, width:450, height:100 }}
      showIcon
    />
  </>
);

export default AlertError;