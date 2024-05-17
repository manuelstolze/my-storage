import { BasicEntity } from "@/src/types/entity/BasicEntity";
import { ProductItem } from "@/src/types/entity/ProductItem";

class StorageContainer extends BasicEntity {
  private name: string;
  private products: Array<ProductItem>;
  private storageUnitId: string;

  constructor(name: string, products?: ProductItem[], storageUnitId?: string) {
    super();
    this.name = name;
    this.products = products ? products : [];
    this.storageUnitId = storageUnitId ? storageUnitId : "";
  }

  public setStorageUnitId(storageUnitId: string): void {
    this.storageUnitId = storageUnitId;
  }

  public getStorageUnitId(): string {
    return this.storageUnitId;
  }
}

export { StorageContainer };
