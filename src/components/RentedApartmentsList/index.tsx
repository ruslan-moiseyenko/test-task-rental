import { useContext, useCallback } from "react";
import { AppContext, AppContextType } from "../../App";
import { Apartment } from "../Apartment";
import styles from "./styles.module.css";

export const RentedApartmentsList = () => {
  const { rentedApartments, setFreeApartments, setRentedApartments } =
    useContext(AppContext!) as AppContextType;

  const handleCancelRent = useCallback(
    (id: string) => {
      setFreeApartments((prevData) => [
        ...prevData,
        rentedApartments.find((item) => item.id === id)!
      ]);

      setRentedApartments((prevData) =>
        prevData.filter((item) => item.id !== id)
      );
    },
    [rentedApartments, setFreeApartments, setRentedApartments]
  );

  const renderList = () => {
    return (
      <>
        <div className={styles.apartmentsWrapper}>
          {rentedApartments.map((item) => (
            <Apartment
              key={item.id}
              data={item}
              secondaryButtonText="Cancel rent"
              onSecondaryButtonClick={() => handleCancelRent(item.id)}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Rented Apartments</h2>
      {rentedApartments?.length ? renderList() : <p>No data</p>}
    </div>
  );
};
