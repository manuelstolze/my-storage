import { BasicEntity } from "@/src/types/entity/BasicEntity";
import { StorageContainer } from "@/src/types/entity/StorageContainer";
class StorageUnit extends BasicEntity {
  private description: string;
  private location: string;
  private container: Array<StorageContainer> = [];
  private storageType: StorageType;

  constructor(
    description: string,
    location: string,
    storageType: StorageType,
    id?: string,
  ) {
    super();

    this.description = description;
    this.location = location;
    this.storageType = storageType;
  }

  addContainer(newContainer: StorageContainer) {
    this.container.push(newContainer);
  }

  public getStorageType(): StorageType {
    return this.storageType;
  }

  public getDescription(): string {
    return this.description;
  }

  public getLocation(): string {
    return this.location;
  }
}

enum StorageType {
  FRIDGE = "FRIDGE",
  PANTRY = "PANTRY",
}

export { StorageType, StorageUnit };
