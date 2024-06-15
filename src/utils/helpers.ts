import { FormData } from "../types/types";
import { RoomData } from "../types/types";
const key = "apartments";

export const updateLocalData = (data: FormData) => {
  const localData = localStorage.getItem(key);
  const parsedData = localData ? JSON.parse(localData) : [];
  const newData = [...parsedData, data];
  const value = JSON.stringify(newData);

  localStorage.setItem(key, value);
};

export const getLocalData = (): RoomData[] => {
  const localData = localStorage.getItem(key);
  const parsedData = localData ? JSON.parse(localData) : [];
  return parsedData;
};
