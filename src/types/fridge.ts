import { Dayjs } from "dayjs";

export interface Fridge {
  id: number;
  location: string;
  description?: string;
  numberOfCompartments: number;
  createdAt: Dayjs;
}

export interface Product {
  id: number;
  barcode: string | null;
  name: string;
  amount: number;
  expirationDate: Dayjs;
}
