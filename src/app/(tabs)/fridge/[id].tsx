import { FlatList, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import fridgeProducts from "@assets/data/fridgeProducts";
import ProductListItem from "@components/fridge/ProductListItem";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();

  //const currentFridge = fridgeDataset.find((item) => item.id === Number(id));

  return (
    <View>
      {/*<Stack.Screen options={{ title: currentFridge?.location }} />*/}

      <FlatList
        data={fridgeProducts}
        renderItem={({ item }) => <ProductListItem product={item} />}
        contentContainerStyle={{ gap: 5, padding: 7 }}
      />
    </View>
  );
};

export default ProductDetailsScreen;
