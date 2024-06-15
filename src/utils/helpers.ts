import { RoomData } from "../types/types";
const key = "apartments";
const keyRented = "rentedApartments";

export const getLocalStorageData = (): RoomData[] => {
  const localData = localStorage.getItem(key);
  const parsedData = localData ? JSON.parse(localData) : [];
  return parsedData;
};

export const getLocalStorageRentedData = (): RoomData[] => {
  const localData = localStorage.getItem(keyRented);
  const parsedData = localData ? JSON.parse(localData) : [];
  return parsedData;
};
