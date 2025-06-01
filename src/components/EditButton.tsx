'use client'

import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { orange } from '@mui/material/colors';

interface EditButtonProps {
  title: string;
  onClick?: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ title, onClick }) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        onClick={onClick}
        sx={{
          color: orange[500],
          transition: 'color 0.3s ease',
          width: 30,
          height: 30,
          '&:hover': {
            color: orange[700],
          },
        }}
        aria-label={title}
      >
        <EditIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;