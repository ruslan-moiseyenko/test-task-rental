import { FormData } from "../types/types";
import { RoomData } from "../types/types";
const key = "apartments";

export const addLocalStorageData = (data: FormData) => {
  const localData = localStorage.getItem(key);
  const parsedData = localData ? JSON.parse(localData) : [];
  const newData = [...parsedData, data];
  const value = JSON.stringify(newData);

  localStorage.setItem(key, value);
};

export const getLocalStorageData = (): RoomData[] => {
  const localData = localStorage.getItem(key);
  const parsedData = localData ? JSON.parse(localData) : [];
  return parsedData;
};

export const removeLocalStorageData = (id: string) => {
  const localData = localStorage.getItem(key);
  const parsedData = localData ? JSON.parse(localData) : [];
  const newData = parsedData.filter((item: RoomData) => item.id !== id);
  const value = JSON.stringify(newData);

  localStorage.setItem(key, value);
};
