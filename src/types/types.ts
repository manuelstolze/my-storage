export interface StorageUnit {
  id: number;
  description: string;
  location: string;
  storageContainers: Array<StorageContainer>;
  storageType: "FRIDGE" | "PANTRY";
}

export interface StorageContainer {}

export interface ProductItem {}
