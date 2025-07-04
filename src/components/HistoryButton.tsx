'use client'

import React from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import AccessTimeIcon from '@mui/icons-material/AccessTime';


interface DeactivateButtonProps {
  title: string;
  onClick?: () => void;
}

const TrackingButton: React.FC<DeactivateButtonProps> = ({ title, onClick }) => {
  return (
    <Tooltip title={title} arrow>
      <IconButton
        onClick={onClick}
        sx={{
          color: red[500],
          transition: 'color 0.3s ease',
          width: 30,
          height: 30,
          '&:hover': {
            color: red[700],
          },
        }}
        aria-label={title}
      >
       <AccessTimeIcon sx={{ fontSize: 20 }} />
      </IconButton>
    </Tooltip>
  );
};

export default TrackingButton;