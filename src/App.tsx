// import styles from "./App.module.css";
import { useEffect, useState, createContext } from "react";
import { AddNewApartment } from "./components/AddNewApartment";
import { getLocalStorageData } from "./utils/helpers";
import { RoomData } from "./types/types";
import { Apartment } from "./components/Apartment";

export interface AppContextType {
  data: RoomData[];
  setData: React.Dispatch<React.SetStateAction<RoomData[]>>;
}

export const AppContext = createContext<AppContextType | null>(null);

function App() {
  const [data, setData] = useState<RoomData[]>([]);

  useEffect(() => {
    const localData = getLocalStorageData();
    if (localData) setData(localData);
  }, []);

  return (
    <AppContext.Provider value={{ data, setData }}>
      <main>
        <h1>Apartments Marketplace</h1>
        <AddNewApartment />
        <Apartment
          data={data[0] || {}}
          primaryButtonText="Rent"
          secondaryButtonText="Delete"
          onPrimaryButtonClick={() => {}}
          onSecondaryButtonClick={() => {}}
        />
      </main>
    </AppContext.Provider>
  );
}

export default App;
