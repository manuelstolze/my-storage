import { View, Text, TextInput, StyleSheet } from "react-native";
import { Link, Stack, useNavigation } from "expo-router";
import { useState } from "react";
import Button from "@components/Button";
import DisabledButton from "@components/DisabledButton";
import { Fridge } from "@/src/types/fridge";
import dayjs from "dayjs";
import useFridge from "@/src/hooks/useFridge";
import { randomInt } from "crypto";

const CreateFridgeScreen = () => {
  const navigation = useNavigation();
  const { addFridge, fridges } = useFridge();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfCompartments, setNumberOfCompartments] = useState("");

  console.log(navigation);

  const handleOnPress = () => {
    const newFridge: Fridge = {
      location: name,
      id: fridges.length + 1,
      description: description,
      numberOfCompartments: Number(numberOfCompartments),
      createdAt: dayjs(),
    };

    addFridge(newFridge);
    navigation.popToTop();
  };

  const isDisabled =
    name.length === 0 &&
    description.length === 0 &&
    numberOfCompartments.length === 0;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Neuen Ort hinzufügen" }} />

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Tiefkühlschrank"
        style={styles.input}
      />

      <Text style={styles.label}>Beschreibung</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Im Keller"
        style={styles.input}
      />

      <Text style={styles.label}>Anzahl von Fächern</Text>
      <TextInput
        value={numberOfCompartments}
        onChangeText={setNumberOfCompartments}
        keyboardType="numeric"
        placeholder="Im Keller"
        style={styles.input}
      />

      {isDisabled ? (
        <DisabledButton text={"Hinzufügen"} />
      ) : (
        <Button text={"Hinzufügen"} onPress={handleOnPress}>
          <Link style={styles.input} href={"/(tabs)/fridge"}>
            Hinzufügen
          </Link>
        </Button>
      )}
    </View>
  );
};

export default CreateFridgeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    //justifyContent: "center",
    flex: 1,
  },
  label: {
    color: "gray",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 5,
  },
});
