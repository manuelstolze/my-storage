import { Product } from "@/src/types/fridge";
import dayjs from "dayjs";

const now = dayjs();

const fridgeProducts: Product[] = [
  {
    id: 1,
    barcode: null,
    name: "Zimt",
    amount: 1,
    expirationDate: now.subtract(1, "hour"),
  },
  {
    id: 2,
    barcode: null,
    name: "Äpfel",
    amount: 3,
    expirationDate: now.subtract(3, "day"),
  },
];

export default fridgeProducts;
