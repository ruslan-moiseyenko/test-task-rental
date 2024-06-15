import React from "react";
import { RoomData } from "../../types/types";
import styles from "./styles.module.css";
import { Button } from "../Button";

type Apartment = {
  data: RoomData;
  primaryButtonText: string;
  onPrimaryButtonClick: () => void;
} & { secondaryButtonText: string; onSecondaryButtonClick: () => void };
export const Apartment: React.FC<Apartment> = ({
  data,
  primaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  secondaryButtonText
}) => {
  const { title, description, price, rooms } = data;
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <p>{description}</p>
      <p>
        <span>Price is: </span>
        {price}
      </p>
      <p>
        <span>Numbers of rooms: </span>
        {rooms}
      </p>
      <Button onClick={onPrimaryButtonClick}>{primaryButtonText}</Button>
      {onSecondaryButtonClick && (
        <Button isPrimary={false} onClick={onSecondaryButtonClick}>
          {secondaryButtonText}
        </Button>
      )}
    </div>
  );
};
