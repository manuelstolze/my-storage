@startuml


abstract class StorageUnit {
id: String

description: String
location: String
container: Container[]
storageType: StorageType


createdAt: Date
updatedAt: Date
}

class Container{
id: String

name: String
products: ProductItem[]
}

enum StorageType {
Fridge
Pantry
}


class ProductItem {
id: String

name: String
barcode: String

amount: Integer
productType: ProductType
expirationDate: Date

createdAt: Date
updatedAt: Date
}

enum ProductType {
Fruit
Vegetables
Meat
Fish
Dairy
Beverages
Bread
Sweets
Spices
CannedFood
ReadyMeals
BakeryProducts
FrozenFood
Miscellaneous
}

StorageUnit "1" *-- "many" Container: contains
Container "1" *-- "many" ProductItem: contains
ProductItem "many" *-- "1" ProductType: has
StorageUnit "many" *-- "1" StorageType: is


@enduml