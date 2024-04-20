import { SQLiteDatabase } from "expo-sqlite";

interface BaseRepository<T> {
  createTable(): void;
  save(entity: T): void;
  update(entity: T): void;
  delete(): void;
  getById(id: string): Promise<T | undefined>;
  getAll(): Promise<Array<T>>;
}

export default BaseRepository;
