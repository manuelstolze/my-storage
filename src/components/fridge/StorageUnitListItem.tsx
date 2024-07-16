import { Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { StorageUnit } from "../../types/types";

interface StorageUnitListItem {
  storageUnit: StorageUnit;
}

const StorageUnitListItem = ({ storageUnit }: StorageUnitListItem) => {
  return (
    <Link
      href={`/fridge/${storageUnit.id}?name=${storageUnit.location}`}
      asChild
    >
      <Pressable style={styles.container}>
        <Text style={styles.title}>{storageUnit.description}</Text>
        <Text>{storageUnit.location}</Text>
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
