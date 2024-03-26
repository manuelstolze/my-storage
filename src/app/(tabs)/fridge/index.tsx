import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Link, Stack, useFocusEffect } from "expo-router";
import fridgeDataset from "@assets/data/fridge";
import { FridgeListItem } from "@components/fridge/FridgeListItem";
import Button from "@components/Button";
import { navigate } from "expo-router/build/global-state/routing";
import useFridge from "@/src/hooks/useFridge";
import { useIsFocused } from "@react-navigation/core";
import React, { useEffect } from "react";

export default function FridgeScreen() {
  const { fridges } = useFridge();

  const isFocused = useIsFocused();

  useEffect(() => {}, [isFocused]);

  return (
    <View>
      <Stack.Screen options={{ title: "Übersicht" }} />

      <FlatList
        data={fridges}
        renderItem={({ item }) => <FridgeListItem fridge={item} />}
        contentContainerStyle={styles.flatList}
      />

      <Link href={"/(tabs)/fridge/create-fridge"} asChild>
        <Button text={"Neuen Ort hinzufügen"} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  flatList: { gap: 10, padding: 10 },
});
