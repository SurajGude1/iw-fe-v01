import React from "react";
import PropTypes from "prop-types";
import styles from "./button.module.css";

const Button = ({
  text,
  backgroundColor = "#6200ee",
  textColor = "#ffffff",
  hoverEffect = true,
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${hoverEffect ? styles.hoverEffect : ""}`}
      style={{
        backgroundColor,
        color: textColor,
      }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  hoverEffect: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
