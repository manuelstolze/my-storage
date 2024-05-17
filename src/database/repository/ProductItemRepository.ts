import * as SQLite from "expo-sqlite";
import { ProductItem } from "@/src/types/entity/ProductItem";
import { SQLiteDatabase } from "expo-sqlite";

class ProductItemRepository {
  private db: SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabase("storage-manager-app.db");
  }

  save(productItem: ProductItem) {
    // return new Promise((resolve, reject) => {
    //   this.db.transaction((tx) => {
    //     tx.executeSql(
    //       "INSERT INTO product_items (id, name, barcode, productType, amount, expirationDate) VALUES (?, ?, ?, ?, ?, ?)",
    //       [
    //         productItem.getId(),
    //         productItem.getName(),
    //         productItem.getBarcode(),
    //         productItem.getProductType(),
    //         productItem.getAmount(),
    //         productItem.getExpirationDate(),
    //       ],
    //       (_, resultSet) => resolve(resultSet),
    //       (_, error) => {
    //         reject(error);
    //         return true;
    //       },
    //     );
    //   });
    // });
  }

  update(productItem: ProductItem) {
    // return new Promise((resolve, reject) => {
    //   this.db.transaction((tx) => {
    //     tx.executeSql(
    //       "UPDATE product_items SET name = ?, barcode = ?, productType = ?, amount = ?, expirationDate = ? WHERE id = ?",
    //       [
    //         productItem.getName(),
    //         productItem.getBarcode(),
    //         productItem.getProductType(),
    //         productItem.getAmount(),
    //         productItem.getExpirationDate(),
    //         productItem.getId(),
    //       ],
    //       (_, resultSet) => resolve(resultSet),
    //       (_, error) => {
    //         reject(error);
    //         return true;
    //       },
    //     );
    //   });
    // });
  }

  delete(id: string) {
    // return new Promise((resolve, reject) => {
    //   this.db.transaction((tx) => {
    //     tx.executeSql(
    //       "DELETE FROM product_items WHERE id = ?",
    //       [id],
    //       (_, resultSet) => resolve(resultSet),
    //       (_, error) => {
    //         reject(error);
    //         return true;
    //       },
    //     );
    //   });
    // });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM product_items",
          [],
          (_, resultSet) => {
            let productItems = resultSet.rows._array.map(
              (row) =>
                new ProductItem(
                  row.name,
                  row.barcode,
                  row.productType,
                  row.amount,
                  row.expirationDate,
                ),
            );
            resolve(productItems);
          },
          (_, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  }

  createTable(): void {
    this.db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS product_items (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT,
        barcode TEXT,
        productType TEXT,
        amount INTEGER,
        expirationDate TEXT
      );`,
      );
    });
  }
}

export { ProductItemRepository };
