import { BasicEntity } from "@/src/types/entity/BasicEntity";
import { ProductItem } from "@/src/types/entity/ProductItem";

class StorageContainer extends BasicEntity {
  private name: string;
  private products: Array<ProductItem>;

  constructor(name: string, products?: ProductItem[]) {
    super();
    this.name = name;
    this.products = products ? products : [];
  }
}

export { StorageContainer };
