import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false, children }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.button}
    >
      {children}
    </button>
  );
};

export default Button;