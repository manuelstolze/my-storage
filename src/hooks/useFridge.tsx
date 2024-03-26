import { useEffect, useState } from "react";
import { Fridge } from "@/src/types/fridge";
import fridgeDataset from "@assets/data/fridge";
import fridge from "@assets/data/fridge";

const useFridge = () => {
  const [fridges, setFridges] = useState<Array<Fridge>>(fridgeDataset);

  const addFridge = (newFridge: Fridge) => {
    fridges.push(newFridge);
    setFridges([...fridges]);
  };

  return { fridges, addFridge };
};

export default useFridge;
