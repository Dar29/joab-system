import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Flex, Tooltip } from 'antd';
import type { ConfigProviderProps } from 'antd';

type SizeType = ConfigProviderProps['componentSize'];

interface ButtonComponentProps {
  onClick?: () => void;
}

const ExportButton: React.FC<ButtonComponentProps> = ({ onClick }) => {
  const [size] = useState<SizeType>('large');
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const baseColor = '#06B6D4';
  const hoverColor = '#0891B2';
  const activeColor = '#0E7490';

  const getButtonColor = () => {
    if (pressed) return activeColor;
    if (hovered) return hoverColor;
    return baseColor;
  };

  return (
    <Flex gap="small" wrap>
      <Tooltip title="Exportar a Excel" arrow>
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          size={size}
          style={{
            backgroundColor: getButtonColor(),
            borderColor: getButtonColor(),
            color: '#fff',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            setPressed(false);
          }}
          onMouseDown={() => setPressed(true)}
          onMouseUp={() => setPressed(false)}
          onClick={onClick}
        >
          Descargar
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default ExportButton;
