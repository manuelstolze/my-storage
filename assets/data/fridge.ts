import { Fridge } from "@/src/types/fridge";
import dayjs from "dayjs";

const fridgeDataset: Fridge[] = [
  {
    id: 1,
    location: "Mein Keller",
    description: "Tiefkühlschrank im Keller.",
    numberOfCompartments: 3,
    createdAt: dayjs(),
  },
  {
    id: 2,
    location: "Küche",
    description: "Kühlschrank in der Küche.",
    numberOfCompartments: 2,
    createdAt: dayjs(),
  },
];

export default fridgeDataset;
