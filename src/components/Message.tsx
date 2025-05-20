import React from 'react';
import { Alert } from 'antd'; // Asegúrate de tener esta importación si usas Ant Design

interface NoteMessageProps {
  message: string;
  typeAlert: 'success' | 'info' | 'warning' | 'error'; // Tipado más específico
}

const NoteMessage: React.FC<NoteMessageProps> = ({ message, typeAlert }) => (
  <>
    <Alert
      message={message}
      type={typeAlert}
      showIcon
    />
  </>
);

export default NoteMessage;
