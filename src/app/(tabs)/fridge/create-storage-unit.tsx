import { StyleSheet, Text, TextInput, View } from "react-native";
import { Link, Stack, useNavigation } from "expo-router";
import { useState } from "react";
import Button from "@components/Button";
import DisabledButton from "@components/DisabledButton";
import { StorageType, StorageUnit } from "@/src/types/entity";
import { StorageUnitRepository } from "@/src/database/repository/StorageUnitRepository";

const CreateStorageUnitScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleOnPress = () => {
    const newStorageUnit = new StorageUnit(
      name,
      description,
      StorageType.FRIDGE,
    );

    const storageUnitRepository = StorageUnitRepository.getInstance();
    storageUnitRepository.save(newStorageUnit);

    navigation.goBack();
  };

  const isDisabled = name.length === 0 && description.length === 0;

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

export default CreateStorageUnitScreen;

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
