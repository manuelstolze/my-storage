import { BasicEntity } from "@/src/types/entity/BasicEntity";
import { StorageContainer } from "@/src/types/entity/StorageContainer";
import StorageContainerRepository from "@/src/database/repository/StorageContainerRepository";

class StorageUnit extends BasicEntity {
  private description: string;
  private location: string;
  private storageContainers: Array<StorageContainer> = [];
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
    this.storageContainers.push(newContainer);
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

  async getStorageContainers(): Promise<StorageContainer[]> {
    if (this.getId() === undefined) {
      throw new Error("StorageUnit must have an id to get storage containers");
    }

    if (!this.storageContainers) {
      const storageContainerRepository =
        StorageContainerRepository.getInstance();
      this.storageContainers =
        await storageContainerRepository.getAllByStorageUnitId(this.getId());
    }
    return this.storageContainers;
  }
}

enum StorageType {
  FRIDGE = "FRIDGE",
  PANTRY = "PANTRY",
}

export { StorageType, StorageUnit };
