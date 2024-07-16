CREATE TABLE StorageUnit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    description VARCHAR(255),
    location VARCHAR(255),
    storageType VARCHAR(255),
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);

CREATE TABLE Container (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name VARCHAR(255),
   storageUnitId INTEGER,
   FOREIGN KEY (storageUnitId) REFERENCES StorageUnit(id)
);

CREATE TABLE ProductItem (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   name VARCHAR(255),
   barcode VARCHAR(255),
   amount INT,
   productType VARCHAR(255),
   expirationDate DATE,
   createdAt TIMESTAMP,
   updatedAt TIMESTAMP,
   containerId INTEGER,
   FOREIGN KEY (containerId) REFERENCES Container(id)
);