import * as SQLite from "expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

class DatabaseConnector {
  private static instance: DatabaseConnector;
  database: SQLite.SQLiteDatabase;

  private constructor() {
    this.database = SQLite.openDatabase("storage-manager-app.db");
  }

  public static getDatabase(): SQLiteDatabase {
    if (!DatabaseConnector.instance) {
      DatabaseConnector.instance = new DatabaseConnector();
    }
    return DatabaseConnector.instance.database;
  }
}

export default DatabaseConnector;
