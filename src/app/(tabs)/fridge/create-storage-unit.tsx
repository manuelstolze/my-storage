import { StyleSheet, Text, TextInput, View } from "react-native";
import { Link, Stack, useNavigation } from "expo-router";
import { useState } from "react";
import Button from "@components/Button";
import DisabledButton from "@components/DisabledButton";
import { StorageType, StorageUnit } from "@/src/types/entity";
import { StorageUnitRepository } from "@/src/database/repository/StorageUnitRepository";
import { StorageContainer } from "@/src/types/entity/StorageContainer";
import StorageContainerRepository from "@/src/database/repository/StorageContainerRepository";

const CreateStorageUnitScreen = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [numberOfStorageUnits, setNumberOfStorageUnits] = useState<string>("1");

  const isDisabled =
    location.length === 0 &&
    description.length === 0 &&
    numberOfStorageUnits.length === 0;

  const handleOnPress = () => {
    const numberOfStorageUnitsInt = parseInt(numberOfStorageUnits);

    if (Number.isNaN(numberOfStorageUnitsInt) || numberOfStorageUnitsInt < 1) {
      throw new Error("Number of storage units must be a positive number");
    }

    const newStorageUnit = new StorageUnit(
      location,
      description,
      StorageType.FRIDGE,
    );

    const storageUnitRepository = StorageUnitRepository.getInstance();
    const storageContainerRepository = StorageContainerRepository.getInstance();
    const uuid = storageUnitRepository.save(newStorageUnit);

    for (let i = 0; i < numberOfStorageUnitsInt; i++) {
      storageContainerRepository.save(new StorageContainer(uuid));
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Neuen Ort hinzufügen" }} />

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
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
      <Text style={styles.label}>Anzahl der Fächer</Text>
      <TextInput
        value={numberOfStorageUnits}
        onChangeText={setNumberOfStorageUnits}
        keyboardType="numeric"
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
