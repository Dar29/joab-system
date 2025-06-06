// Modal.tsx
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import TableComp from './Tracking';
import Chart from './Chart';

interface ModalComponentProps {
  title?: string;
  id: number;
  open: boolean;
  loading: boolean;
  onCancel: () => void;
}

const ModalComponent: React.FC<ModalComponentProps> = ({ title, id, open, loading, onCancel }) => {
  const [rowData, setRowData] = useState([]); // Estado para los datos
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/tracking?id_producto=${id}`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        const resp = await response.json();
        setRowData(resp.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
      }
  };
    fetchData();
 }, []);

 console.log(rowData);
  return (
    <Modal
      title={title}
      open={open}
      confirmLoading={loading}
      onCancel={onCancel}
      footer={null}
    >
      <Chart/>
    </Modal>
  );
};

export default ModalComponent;
