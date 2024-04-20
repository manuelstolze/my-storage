import { Dayjs } from "dayjs";
import { BasicEntity } from "@/src/types/entity";

export interface Fridge {
  id: string;
  location: string;
  description?: string;
  numberOfCompartments: number;
  createdAt: Dayjs;
}

export interface Product {
  id: string;
  barcode: string | null;
  name: string;
  amount: number;
  expirationDate: Dayjs;
}
