import { Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { StorageUnit } from "@/src/types/entity";

interface StorageUnitListItem {
  storageUnit: StorageUnit;
}

const StorageUnitListItem = ({ storageUnit }: StorageUnitListItem) => {
  return (
    <Link
      href={`/fridge/${storageUnit.getId()}?name=${storageUnit.getLocation()}`}
      asChild
    >
      <Pressable style={styles.container}>
        <Text style={styles.title}>{storageUnit.getLocation()}</Text>
        <Text>{storageUnit.getDescription()}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});

export { StorageUnitListItem };
