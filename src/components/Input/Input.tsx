import React from 'react';
import styles from './Input.module.scss';

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder, value, onChange, name, error }) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={`${styles.input} ${error ? styles.error : ''}`}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Input;
