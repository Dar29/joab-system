'use client'

import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { green } from '@mui/material/colors';

interface AddButtonProps {
  title: string;
  onClick?: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ title, onClick }) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        onClick={onClick}
        sx={{
          color: green[500],
          transition: 'color 0.3s ease',
          width: 50,
          height: 50,
          '&:hover': {
            color: green[700],
          },
        }}
        aria-label={title}
      >
        <AddCircleIcon sx={{ fontSize: 30 }} /> 
      </IconButton>
    </Tooltip>
  );
};

export default AddButton;
