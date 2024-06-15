import React, { FC } from "react";
import styles from "./styles.module.css";

type ButtoProps = {
  children: React.ReactNode;
  onClick: () => void;
  isPrimary?: boolean;
};

export const Button: FC<ButtoProps> = ({
  isPrimary = true,
  onClick,
  children
}) => {
  return (
    <button
      className={`${styles.button} ${
        isPrimary ? styles.primary : styles.secondary
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
