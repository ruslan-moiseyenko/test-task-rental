import React, { FC, useContext } from "react";
import { RoomData } from "../../types/types";
import { Apartment } from "../Apartment";
import { removeLocalStorageData } from "../../utils/helpers";
import { AppContext, AppContextType } from "../../App";

type ApartmentsListProps = {
  data: RoomData[];
};

export const ApartmentsList: FC<ApartmentsListProps> = ({ data }) => {
  const { setData } = useContext(AppContext!) as AppContextType;
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

  {
    sortOrder;
  }
  const handleSorting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "asc") {
      const sortedData = data.sort((a, b) => a.price - b.price);
      setData(sortedData);
      setSortOrder("asc");
    } else {
      const sortedData = data.sort((a, b) => b.price - a.price);
      setData(sortedData);
      setSortOrder("desc");
    }
  };

  const handleRemove = (id: string) => {
    removeLocalStorageData(id);
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };
  return (
    <div>
      <h2>Available Apartments ({data.length})</h2>

      <select onChange={handleSorting}>
        <option value="asc">Price: Cheapest first</option>
        <option value="desc">Price: Highest first</option>
      </select>
      {data.map((item) => (
        <Apartment
          key={item.id}
          data={item || {}}
          primaryButtonText="Rent"
          onPrimaryButtonClick={() => {}}
          secondaryButtonText="Delete"
          onSecondaryButtonClick={() => handleRemove(item.id)}
        />
      ))}
    </div>
  );
};
