import React from 'react';
import PropTypes from 'prop-types';
import styles from './input.module.css';

const Input = ({
  type = "text",
  value,
  onChange,
  placeholder = "",
  width = "100%",
  disabled = false,
  error = false,
  success = false,
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`
        ${styles.Input} 
        ${error ? styles.Error : ''}
        ${success ? styles.Success : ''}
        ${className}
      `}
      style={{ width }}
      {...props}
    />
  );
};

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'tel', 'url']),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  success: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;