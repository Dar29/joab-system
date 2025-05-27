import * as React from 'react';
import Button from '@mui/material/Button';

interface ButtonProps {
  variant: 'text' | 'outlined' | 'contained';
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  text: string;
  onClick?: () => void;
}

export default function ButtonComponent({ variant, color, text, onClick }: ButtonProps) {
  return (
    <Button variant={variant} color={color} onClick={onClick}>
      {text}
    </Button>
  );
}
