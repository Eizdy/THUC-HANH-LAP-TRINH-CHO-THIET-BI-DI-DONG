import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TabProps } from "./types";
import { useFavorites } from "./FavoritesContext";
import { PHONES } from "../data/phones";
import { ProductRow } from "./ProductsTab";
import { colors } from "../theme";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const favPhones = PHONES.filter((p) => ids.includes(p.id));

  if (favPhones.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favPhones}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <ProductRow
          phone={item}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  emptyWrap: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  emptyText: { fontSize: 15, color: colors.muted },
});