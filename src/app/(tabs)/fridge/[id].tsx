import { FlatList, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import fridgeProducts from "@assets/data/fridgeProducts";
import ProductListItem from "@components/fridge/ProductListItem";
import { useEffect, useState } from "react";
import { StorageUnitRepository } from "@/src/database/repository/StorageUnitRepository";
import { useIsFocused } from "@react-navigation/core";
import { StorageContainer } from "@/src/types/entity/StorageContainer";
import StorageContainerRepository from "@/src/database/repository/StorageContainerRepository";

const StorageContainerOverviewScreen = () => {
  const { id, name } = useLocalSearchParams();
  const isFocused = useIsFocused();
  const [storageContainers, setStorageContainers] = useState<
    StorageContainer[]
  >([]);

  // TODO: Fetch product details by storage_unit id from sqlite

  // TODO: Add products into db

  useEffect(() => {
    if (!isFocused) return;

    const storageContainerRepository = StorageContainerRepository.getInstance();

    // storageUnitRepository.removeAll().then(() => {
    //   console.log("removed all");
    // });

    storageContainerRepository.getAll().then(setStorageContainers);
  }, [isFocused]);

  return (
    <View>
      <Stack.Screen options={{ title: name as string }} />

      <FlatList
        data={fridgeProducts}
        renderItem={({ item }) => <ProductListItem product={item} />}
        contentContainerStyle={{ gap: 5, padding: 7 }}
      />
    </View>
  );
};

export default StorageContainerOverviewScreen;
