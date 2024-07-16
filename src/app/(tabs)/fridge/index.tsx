import { FlatList, StyleSheet, View } from "react-native";
import { Link, Stack } from "expo-router";
import { StorageUnitListItem } from "@components/fridge/StorageUnitListItem";
import Button from "@components/Button";
import { useIsFocused } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import { StorageUnit } from "../../../types/entity";
import { StorageUnitRepository } from "../../../database/repository/StorageUnitRepository";
import { useSQLiteContext } from "expo-sqlite/next";
import { SQLiteDatabase } from "expo-sqlite";
import * as SQLite from "expo-sqlite";

export default function StorageUnitScreen() {
  const isFocused = useIsFocused();
  const [storageUnits, setStorageUnits] = useState<StorageUnit[]>([]);
  const db = useSQLiteContext();

  async function getData() {
    const result = db.getAllSync<StorageUnit>(
      "SELECT * FROM StorageUnit ORDER BY description DESC",
    );
    setStorageUnits(result);
    console.log(result, result.length);
  }

  useEffect(() => {
    db.withTransactionAsync(async () => await getData())
      .then(() => {
        console.log("done");
      })
      .catch((e) => {
        console.error(e);
      });
  }, [db]);

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
