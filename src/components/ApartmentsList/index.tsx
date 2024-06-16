import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { Apartment } from "../Apartment";
import { AppContext, AppContextType } from "../../App";
import styles from "./styles.module.css";

export const ApartmentsList = () => {
  const { freeApartments, setFreeApartments, setRentedApartments } = useContext(
    AppContext!
  ) as AppContextType;
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [filter, setFilter] = useState<string>("0");

  const sortedData = useMemo(() => {
    if (!freeApartments.length) return [];
    return [...freeApartments].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [freeApartments, sortOrder]);

  useEffect(() => {
    if (!freeApartments.length) return;
    setFreeApartments((prev) => {
      const isDifferent =
        prev.length !== sortedData.length ||
        prev.some(
          (apartment, index) => apartment.price !== sortedData[index].price
        );
      if (isDifferent) {
        return sortedData;
      }
      return prev;
    });
  }, [freeApartments, setFreeApartments, sortedData]);

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
        freeApartments.find((item) => item.id === id)!
      ]);
      setFreeApartments((prevData) =>
        prevData.filter((item) => item.id !== id)
      );
    },
    [freeApartments, setRentedApartments, setFreeApartments]
  );

  const handleFilter = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setFilter(event.target.value);
    },
    []
  );

  const renderList = () => {
    return (
      <div className={styles.listWrapper}>
        {freeApartments
          .filter((item) =>
            filter === "0" ? true : item.rooms.toString() === filter
          )
          .map((item) => (
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
        <h2>Available Apartments ({freeApartments.length})</h2>
        <div className={styles.sort}>
          <p>Filter by: </p>
          <select onChange={handleFilter}>
            <option value="0">Rooms: All</option>
            <option value="1">Rooms: 1</option>
            <option value="2">Rooms: 2</option>
            <option value="3">Rooms: 3+</option>
          </select>
          <p>Sort by: </p>
          <select onChange={handleSorting}>
            <option value="asc">Price: Cheapest first</option>
            <option value="desc">Price: Highest first</option>
          </select>
        </div>
      </div>

      {freeApartments?.length ? renderList() : <p>No data</p>}
    </div>
  );
};
