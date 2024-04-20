import { FlatList, StyleSheet, View } from "react-native";
import { Link, Stack } from "expo-router";
import { StorageUnitListItem } from "@components/fridge/StorageUnitListItem";
import Button from "@components/Button";
import { useIsFocused } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import { StorageUnitRepository } from "@/src/database/repository/StorageUnitRepository";
import { StorageUnit } from "@/src/types/entity";

export default function StorageUnitScreen() {
  const isFocused = useIsFocused();
  const [storageUnits, setStorageUnits] = useState<StorageUnit[]>([]);

  useEffect(() => {
    if (!isFocused) return;

    const storageUnitRepository = StorageUnitRepository.getInstance();

    // storageUnitRepository.removeAll().then(() => {
    //   console.log("removed all");
    // });

    storageUnitRepository.getAll().then(setStorageUnits);
  }, [isFocused]);

  return (
    <View>
      <Stack.Screen options={{ title: "Übersicht" }} />

      <FlatList
        data={storageUnits}
        renderItem={({ item }) => <StorageUnitListItem storageUnit={item} />}
        contentContainerStyle={styles.flatList}
      />

      <Link href={"/(tabs)/fridge/create-storage-unit"} asChild>
        <Button text={"Neuen Ort hinzufügen"} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: { gap: 10, padding: 10 },
});
