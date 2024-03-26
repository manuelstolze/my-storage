import { Text, StyleSheet, Pressable } from "react-native";
import { Link } from "expo-router";
import { Fridge } from "@/src/types/fridge";

interface FridgeListItemProps {
  fridge: Fridge;
}

const FridgeListItem = ({ fridge }: FridgeListItemProps) => {
  return (
    <Link href={`/fridge/${fridge.id}`} asChild>
      <Pressable style={styles.container}>
        <Text style={styles.title}>{fridge.location}</Text>
        <Text>{fridge.description}</Text>
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

export { FridgeListItem };
