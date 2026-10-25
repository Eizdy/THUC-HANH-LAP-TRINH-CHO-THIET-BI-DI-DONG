import React, { useState } from "react";
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SelectPhoneParamList } from "./SelectPhoneApp";
import { ColorKey, Phone } from "../types";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          <Text style={styles.small}>{line2}</Text>

          {/* TODO 3: Chỉ hiện khi đã chọn màu */}
          {picked !== undefined && (
            <>
              <Text style={styles.small}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.small}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.price}>{formatPrice(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>

        {/* TODO 4: Nút XONG */}
        <Pressable
          style={styles.doneBtn}
          onPress={() => navigation.navigate({ name: "Product", params: { color: picked }, merge: true })}        >
          <Text style={styles.doneBtnText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", padding: 14, gap: 12, backgroundColor: "#fff" },
  thumb: { width: 112, height: 132 },
  headerText: { flex: 1, gap: 5, justifyContent: "flex-start" },
  small: { fontSize: 14, color: colors.text },
  bold: { fontWeight: "bold" },
  price: { fontSize: 16, fontWeight: "bold", color: colors.text, marginTop: 4 },
  body: { flex: 1, backgroundColor: colors.grey, padding: 16, justifyContent: "space-between" },
  hint: { fontSize: 16, color: colors.text },
  swatches: { alignItems: "center", gap: 14 },
  swatch: { width: 85, height: 80, elevation: 3 },
  swatchOn: { borderWidth: 3, borderColor: colors.navy },
  doneBtn: {
    backgroundColor: colors.blue,
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.red,
  },
  doneBtnText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});