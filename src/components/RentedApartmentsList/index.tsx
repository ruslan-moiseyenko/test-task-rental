import { AppContext, AppContextType } from "../../App";
import { Apartment } from "../Apartment";

import { useContext } from "react";

export const RentedApartmentsList = () => {
  const { rentedApartments, setFreeApartments, setRentedApartments } =
    useContext(AppContext!) as AppContextType;

  const handleCancelRent = (id: string) => {
    console.log(id);
    setFreeApartments((prevData) => [
      ...prevData,
      rentedApartments.find((item) => item.id === id)!
    ]);
    setRentedApartments((prevData) =>
      prevData.filter((item) => item.id !== id)
    );
  };
  return (
    <div>
      {rentedApartments.map((item) => (
        <Apartment
          key={item.id}
          data={item}
          secondaryButtonText="Cancel rent"
          onSecondaryButtonClick={() => handleCancelRent(item.id)}
        />
      ))}
    </div>
  );
};
