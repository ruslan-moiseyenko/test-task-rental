import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
// import { RoomData } from "../../types/types";
import { Apartment } from "../Apartment";
import { AppContext, AppContextType } from "../../App";

import styles from "./styles.module.css";

// type ApartmentsListProps = {
//   data: RoomData[];
// };

export const ApartmentsList = () => {
  const { freeApartments, setFreeApartments, setRentedApartments } = useContext(
    AppContext!
  ) as AppContextType;
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

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
  const renderList = () => {
    return (
      <div className={styles.listWrapper}>
        {freeApartments.map((item) => (
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
