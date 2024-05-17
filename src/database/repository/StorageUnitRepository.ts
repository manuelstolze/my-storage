import BaseRepository from "@/src/database/repository/BaseRepository";

import { StorageUnit } from "@/src/types/entity";
import * as Crypto from "expo-crypto";
import DatabaseConnector from "@/src/database/database";
import { SQLiteDatabase } from "expo-sqlite";

class StorageUnitRepository implements BaseRepository<StorageUnit> {
  private static instance: StorageUnitRepository;
  database: SQLiteDatabase;

  private constructor() {
    this.database = DatabaseConnector.getDatabase();
    this.createTable();
  }

  public static getInstance(): StorageUnitRepository {
    if (!StorageUnitRepository.instance) {
      StorageUnitRepository.instance = new StorageUnitRepository();
    }
    return StorageUnitRepository.instance;
  }

  createTable(): void {
    this.database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS storage_units (
          id TEXT PRIMARY KEY NOT NULL,
          description TEXT,
          location TEXT,
          storageType TEXT
        );`,
      );
    });
  }

  delete(): void {
    throw new Error("Method not implemented.");
  }

  save(storageUnit: StorageUnit): string {
    const uuid = Crypto.randomUUID();

    this.database.transaction((tx) => {
      try {
        tx.executeSql(
          `INSERT INTO storage_units (id, description, location, storageType) VALUES (?, ?, ?, ?);`,
          [
            uuid,
            storageUnit.getDescription(),
            storageUnit.getLocation(),
            storageUnit.getStorageType(),
          ],
        );
      } catch (error) {
        console.error(error);
        throw error; // This will cause the transaction to be rolled back.
      }
    });

    return uuid;
  }

  update(storageUnit: StorageUnit): void {
    this.database.transaction((tx) => {
      tx.executeSql(
        `UPDATE storage_units SET description = ?, location = ?, storageType = ? WHERE id = ?;`,
        [
          storageUnit.getDescription(),
          storageUnit.getLocation(),
          storageUnit.getStorageType(),
          storageUnit.getId(),
        ],
      );
    });
  }

  getAll(): Promise<StorageUnit[]> {
    return new Promise((resolve, reject) => {
      this.database.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM storage_units;`,
          [],
          (_, resultSet) => {
            if (resultSet.rows._array.length === 0) {
              resolve([]);
            }

            let storageUnits = resultSet.rows._array.map(
              (row) =>
                new StorageUnit(
                  row.location,
                  row.description,
                  row.storageType,
                  row.id,
                ),
            );
            resolve(storageUnits);
          },
          (_, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  }

  getById(id: string): Promise<StorageUnit | undefined> {
    return new Promise((resolve, reject) => {
      this.database.transaction((tx) => {
        tx.executeSql(
          `SELECT * FROM storage_units WHERE id = ?;`,
          [id],
          (_, resultSet) => {
            let storageUnit =
              resultSet.rows._array.length > 0
                ? new StorageUnit(
                    resultSet.rows._array[0].description,
                    resultSet.rows._array[0].location,
                    resultSet.rows._array[0].storageType,
                  )
                : undefined;
            resolve(storageUnit);
          },
          (_, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  }

  removeAll(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.database.transaction((tx) => {
        tx.executeSql(
          `DELETE FROM storage_units;`,
          [],
          (_, resultSet) => {
            resolve();
          },
          (_, error) => {
            reject(error);
            return true;
          },
        );
      });
    });
  }
}

export { StorageUnitRepository };
