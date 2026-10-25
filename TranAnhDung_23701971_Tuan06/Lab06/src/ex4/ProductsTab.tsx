import React from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { TabProps } from "./types";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { Phone } from "../types";
import { colors, formatPrice } from "../theme";
import { useFavorites } from "./FavoritesContext";

export function ProductRow({ phone, onPress }: { phone: Phone; onPress: () => void }) {
  const { has } = useFavorites();
  const saved = has(phone.id);

  return (
    <Pressable style={styles.row} onPress={onPress}>
      <Image
        source={PHONE_COLORS[phone.defaultColor].image}
        style={styles.thumb}
        resizeMode="contain"
      />
      <View style={{ flex: 1, gap: 4 }}>
        <Text style={styles.name}>{phone.name.split(" - ")[0]}</Text>
        <Text style={styles.price}>{formatPrice(phone.price)}</Text>
      </View>
      <Text style={{ fontSize: 20, color: saved ? colors.red : colors.muted }}>
        {saved ? "♥" : "♡"}
      </Text>
    </Pressable>
  );
}

export function ProductsTab({ navigation }: TabProps<"Products">) {
  return (
    <FlatList
      data={PHONES}
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    gap: 12,
  },
  thumb: { width: 52, height: 52 },
  name: { fontSize: 15, fontWeight: "600", color: colors.text },
  price: { fontSize: 14, color: colors.red, fontWeight: "bold" },
});