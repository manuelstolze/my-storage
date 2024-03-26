import { FlatList, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import fridgeDataset from "@assets/data/fridge";
import { FridgeListItem } from "@components/fridge/FridgeListItem";
import fridgeProducts from "@assets/data/fridgeProducts";
import ProductListItem from "@components/fridge/ProductListItem";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  const currentFridge = fridgeDataset.find((item) => item.id === Number(id));

  return (
    <View>
      <Stack.Screen options={{ title: currentFridge?.location }} />

      <FlatList
        data={fridgeProducts}
        renderItem={({ item }) => <ProductListItem product={item} />}
        contentContainerStyle={{ gap: 5, padding: 7 }}
      />
    </View>
  );
};

export default ProductDetailsScreen;
