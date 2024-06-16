import React, { FC, useCallback, useContext, useEffect } from "react";
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

  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [data, sortOrder]);

  useEffect(() => {
    if (!sortedData.length) return;
    setFreeApartments(sortedData);
  }, [sortedData, setFreeApartments]);

  const handleSorting = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOrder(event.target.value as "asc" | "desc");
    },
    []
  );

  const handleRemove = useCallback(
    (id: string) => {
      setFreeApartments((prevData) =>
        prevData.filter((item) => item.id !== id)
      );
    },
    [setFreeApartments]
  );

  const handleRented = useCallback(
    (id: string) => {
      setRentedApartments((prevData) => [
        ...prevData,
        data.find((item) => item.id === id)!
      ]);
      setFreeApartments((prevData) =>
        prevData.filter((item) => item.id !== id)
      );
    },
    [data, setRentedApartments, setFreeApartments]
  );
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
