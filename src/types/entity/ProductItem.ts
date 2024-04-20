import { BasicEntity } from "@/src/types/entity";
import { Dayjs } from "dayjs";

class ProductItem extends BasicEntity {
  private name: string;

  private barcode: string;

  private amount: number;
  private productType: ProductType;
  private expirationDate: Dayjs;

  constructor(
    name: string,
    barcode: string,
    productType: ProductType,
    amount: number,
    expirationDate: Dayjs,
  ) {
    super();

    this.name = name;
    this.barcode = barcode;
    this.amount = amount;
    this.productType = productType;
    this.expirationDate = expirationDate;
  }
}

enum ProductType {
  FRUIT = "FRUIT",
  VEGETABLES = "VEGETABLES",
  MEAT = "MEAT",
  FISH = "FISH",
  DAIRY = "DAIRY",
  BEVERAGES = "BEVERAGES",
  BREAD = "BREAD",
  SWEETS = "SWEETS",
  SPICES = "SPICES",
  CANNED_FOOD = "CANNED_FOOD",
  READY_MEALS = "READY_MEALS",
  BAKERY_PRODUCTS = "BAKERY_PRODUCTS",
  FROZEN_FOOD = "FROZEN_FOOD",
  MISCELLANEOUS = "MISCELLANEOUS",
}

export { ProductType, ProductItem };
