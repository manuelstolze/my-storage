import "react-native-get-random-values";
import * as Crypto from "expo-crypto";
import { Dayjs } from "dayjs";

abstract class BasicEntity {
  private id: string;
  private createdAt: Date;

  protected constructor() {
    this.id = Crypto.randomUUID();
    this.createdAt = new Date();
  }

  public getId(): string {
    return this.id;
  }
}

export { BasicEntity };
