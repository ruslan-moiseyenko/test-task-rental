import React, { FC, useContext } from "react";
import { RoomData } from "../../types/types";
import { Apartment } from "../Apartment";
import { AppContext, AppContextType } from "../../App";

import styles from "./styles.module.css";

type ApartmentsListProps = {
  data: RoomData[];
};

export const ApartmentsList: FC<ApartmentsListProps> = ({ data }) => {
  const { setFreeApartments, setRentedApartments } = useContext(
    AppContext!
  ) as AppContextType;
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  {
    sortOrder;
  }
  const handleSorting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "asc") {
      const sortedData = data.sort((a, b) => a.price - b.price);
      setFreeApartments(sortedData);
      setSortOrder("asc");
    } else {
      const sortedData = data.sort((a, b) => b.price - a.price);
      setFreeApartments(sortedData);
      setSortOrder("desc");
    }
  };

  const handleRemove = (id: string) => {
    setFreeApartments((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleRented = (id: string) => {
    setRentedApartments((prevData) => [
      ...prevData,
      data.find((item) => item.id === id)!
    ]);
    setFreeApartments((prevData) => prevData.filter((item) => item.id !== id));
  };

  const renderList = () => {
    return (
      <div className={styles.listWrapper}>
        {data.map((item) => (
          <Apartment
            key={item.id}
            data={item || {}}
            primaryButtonText="Rent"
            onPrimaryButtonClick={() => handleRented(item.id)}
            secondaryButtonText="Delete"
            onSecondaryButtonClick={() => handleRemove(item.id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Available Apartments ({data.length})</h2>
        <div className={styles.sort}>
          <p>Sort by: </p>
          <select onChange={handleSorting}>
            <option value="asc">Price: Cheapest first</option>
            <option value="desc">Price: Highest first</option>
          </select>
        </div>
      </div>

      {data?.length ? renderList() : <p>No data</p>}
    </div>
  );
};
