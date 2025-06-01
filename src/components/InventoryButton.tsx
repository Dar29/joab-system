'use client'

import React from 'react';
import InventoryIcon from '@mui/icons-material/Inventory'; // Or use 'ViewListIcon' for a different look
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';

interface ViewInventoryButtonProps {
  title: string;
  onClick?: () => void;
}

const ViewInventoryButton: React.FC<ViewInventoryButtonProps> = ({ title, onClick }) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        onClick={onClick}
        sx={{
          color: blue[500],
          transition: 'color 0.3s ease',
          width: 30,
          height: 30,
          '&:hover': {
            color: blue[700],
          },
        }}
        aria-label={title}
      >
        <InventoryIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Tooltip>
  );
};

export default ViewInventoryButton;