// import styles from "./App.module.css";
import { useEffect, useState, createContext } from "react";
import { AddNewApartment } from "./components/AddNewApartment";
import { getLocalStorageData } from "./utils/helpers";
import { RoomData } from "./types/types";
import { ApartmentsList } from "./components/ApartmentsList";
import { RentedApartmentsList } from "./components/RentedApartmentsList";

export interface AppContextType {
  freeApartments: RoomData[];
  setFreeApartments: React.Dispatch<React.SetStateAction<RoomData[]>>;
  rentedApartments: RoomData[];
  setRentedApartments: React.Dispatch<React.SetStateAction<RoomData[]>>;
}

export const AppContext = createContext<AppContextType | null>(null);

function App() {
  const [freeApartments, setFreeApartments] = useState<RoomData[]>([]);
  const [rentedApartments, setRentedApartments] = useState<RoomData[]>([]);

  useEffect(() => {
    const localData = getLocalStorageData();
    if (localData) setFreeApartments(localData);
  }, []);

  return (
    <AppContext.Provider
      value={{
        freeApartments,
        setFreeApartments,
        rentedApartments,
        setRentedApartments
      }}
    >
      <main>
        <h1>Apartments Marketplace</h1>
        <AddNewApartment />
        <RentedApartmentsList />

        <ApartmentsList data={freeApartments} />
      </main>
    </AppContext.Provider>
  );
}

export default App;
