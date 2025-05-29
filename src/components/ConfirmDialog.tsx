import React from 'react';
import { Modal } from 'antd';

interface DialogProps {
  message: string;
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDialog: React.FC<DialogProps> = ({ message, visible, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Confirmación"
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Sí, insertar"
      cancelText="Cancelar"
    >
      <p>{message}</p>
    </Modal>
  );
};

export default ConfirmDialog;
