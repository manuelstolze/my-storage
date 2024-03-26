import { Text, StyleSheet, View } from "react-native";
import { Product } from "@/src/types/fridge";
import dayjs from "dayjs";

interface ProductListItem {
  product: Product;
}

const ProductListItem = ({ product }: ProductListItem) => {
  const colorCode = product.expirationDate.isAfter(dayjs().subtract(2, "day"))
    ? "#FFE33865"
    : "#0B662325";

  return (
    <View style={{ ...styles.container, backgroundColor: colorCode }}>
      <Text style={styles.date}>
        {product.expirationDate.format("DD.MM.YYYY")}
      </Text>
      <Text style={styles.title}>{product.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 10,
    flex: 1,
    display: "flex",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
    alignSelf: "flex-start",
  },
  date: {
    fontSize: 11,
    alignSelf: "flex-end",
  },
});

export default ProductListItem;
