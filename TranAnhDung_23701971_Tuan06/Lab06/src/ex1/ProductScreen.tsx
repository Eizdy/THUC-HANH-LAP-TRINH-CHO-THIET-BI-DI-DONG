import React from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SelectPhoneParamList } from "./SelectPhoneApp";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image source={PHONE_COLORS[shown].image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>

        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.helpCircle}>
            <Text style={styles.helpText}>?</Text>
          </View>
        </View>

        {/* TODO 1: Nút chọn màu */}
        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseBtnText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.arrow}>{">"}</Text>
        </Pressable>
      </View>

      {/* TODO 2: Nút CHỌN MUA nằm sát đáy màn hình */}
      <Pressable style={styles.buyBtn} onPress={() => {}}>
        <Text style={styles.buyBtnText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingBottom: 16 },
  imageWrap: { flex: 1, justifyContent: "center", alignItems: "center", paddingVertical: 12 },
  image: { width: "80%", height: "100%" },
  info: { gap: 10, marginBottom: 20 },
  name: { fontSize: 15, color: colors.text, fontWeight: "500" },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  review: { fontSize: 14, color: colors.text },
  price: { fontSize: 18, fontWeight: "bold", color: colors.text },
  oldPrice: { fontSize: 15, color: colors.muted, textDecorationLine: "line-through" },
  badge: { fontSize: 12, fontWeight: "bold", color: colors.red },
  helpCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: colors.text,
    justifyContent: "center",
    alignItems: "center",
  },
  helpText: { fontSize: 11, fontWeight: "bold" },
  chooseBtn: {
    borderWidth: 1,
    borderColor: colors.muted,
    borderRadius: 6,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: 6,
  },
  chooseBtnText: { fontSize: 15, color: colors.text },
  arrow: { position: "absolute", right: 12, fontSize: 18, color: colors.text },
  buyBtn: {
    backgroundColor: colors.red,
    borderRadius: 6,
    paddingVertical: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  buyBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});