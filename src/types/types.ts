export interface FormData {
  title: string;
  description: string;
  rooms: number;
  price: number;
}

export type RoomData = FormData & {
  id: string;
};
