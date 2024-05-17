import BaseRepository from "@/src/database/repository/BaseRepository";
import { StorageContainer } from "@/src/types/entity/StorageContainer";
import { intersect } from "@hapi/hoek";
import { SQLiteDatabase } from "expo-sqlite";
import DatabaseConnector from "@/src/database/database";

class StorageContainerRepository implements BaseRepository<StorageContainer> {
  private static instance: StorageContainerRepository;
  database: SQLiteDatabase;

  private constructor() {
    this.database = DatabaseConnector.getDatabase();
    this.createTable();
  }

  public static getInstance(): StorageContainerRepository {
    if (!StorageContainerRepository.instance) {
      StorageContainerRepository.instance = new StorageContainerRepository();
    }
    return StorageContainerRepository.instance;
  }

  createTable(): void {
    this.database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS storage_container (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT,
        storageType TEXT,
        FOREIGN KEY (storageUnitId) REFERENCES storage_unit (id)
      );`,
      );
    });
  }

  delete(): void {}

  getAll(): Promise<StorageContainer[]> {
    return new Promise((resolve, reject) => {
      this.database.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM storage_container;`,
          [],
          (_, resultSet) => {
            if (resultSet.rows._array.length === 0) {
              resolve([]);
            }

            let storageContainer = resultSet.rows._array.map(
              (row) => new StorageContainer(row.name, []),
            );
            resolve(storageContainer);
          },
          (_, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  }

  getById(id: string): Promise<StorageContainer | undefined> {
    return Promise.resolve(undefined);
  }

  save(entity: StorageContainer): void {}

  update(entity: StorageContainer): void {}
}

export default StorageContainerRepository;
