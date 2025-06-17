// Modal.tsx
import { Modal, Spin } from 'antd';
import React from 'react';

interface ModalComponentProps {
  title: string;
  open: boolean;
  loading: boolean;
  onCancel: () => void;
  children?: React.ReactNode;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ title, open, loading, onCancel, children }) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={"70%"}
    >
      {loading ? (
      <div
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin size="large" />
    </div>
      ) :  (
        children
      )}
    </Modal>
  );
};

export default ModalComponent;
