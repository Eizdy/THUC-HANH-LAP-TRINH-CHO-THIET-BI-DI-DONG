import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { RootProps } from "./types";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { useFavorites } from "./FavoritesContext";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params;
  const phone = PHONES.find((p) => p.id === id);
  const { has, toggle } = useFavorites();

  if (!phone) {
    return (
      <View style={styles.center}>
        <Text style={styles.name}>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const saved = has(phone.id);

  return (
    <View style={styles.container}>
      <Image
        source={PHONE_COLORS[phone.defaultColor].image}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{phone.name}</Text>
      <Stars value={phone.rating} size={18} />
      <Text style={styles.price}>{formatPrice(phone.price)}</Text>
      <Text style={styles.supplier}>Cung cấp bởi: {phone.supplier}</Text>

      <Pressable
        style={[styles.favBtn, saved && styles.favBtnActive]}
        onPress={() => toggle(phone.id)}
      >
        <Text style={[styles.favBtnText, saved && styles.favBtnTextActive]}>
          {saved ? "♥ Đã lưu" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  container: { flex: 1, backgroundColor: "#fff", padding: 20, alignItems: "center", gap: 10 },
  image: { width: 200, height: 220, marginBottom: 8 },
  name: { fontSize: 17, fontWeight: "bold", color: colors.text, textAlign: "center" },
  price: { fontSize: 20, fontWeight: "bold", color: colors.red },
  supplier: { fontSize: 14, color: colors.muted },
  favBtn: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  favBtnActive: { backgroundColor: colors.red },
  favBtnText: { color: colors.red, fontWeight: "bold", fontSize: 15 },
  favBtnTextActive: { color: "#fff" },
});