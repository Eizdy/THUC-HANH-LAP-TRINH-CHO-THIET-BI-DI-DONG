import React, { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { SelectPhoneLocal } from "./src/ex1/SelectPhoneApp";
import { SelectPhoneApi } from "./src/ex1/SelectPhoneApi";
import { BottomTabApp } from "./src/ex3/BottomTabApp";
import { StackTabApp } from "./src/ex4/StackTabApp";
import { DrawerApp } from "./src/ex5/DrawerApp";
import { colors } from "./src/theme";

const EXERCISES = [
  { id: 1, label: "Bài 1", Comp: SelectPhoneLocal },
  { id: 2, label: "Bài 2", Comp: SelectPhoneApi },
  { id: 3, label: "Bài 3", Comp: BottomTabApp },
  { id: 4, label: "Bài 4", Comp: StackTabApp },
  { id: 5, label: "Bài 5", Comp: DrawerApp },
];

export default function App() {
  const [active, setActive] = useState(1);
  const ActiveComp = EXERCISES.find((e) => e.id === active)?.Comp ?? SelectPhoneLocal;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.menuBar}>
        {EXERCISES.map((ex) => (
          <Pressable
            key={ex.id}
            onPress={() => setActive(ex.id)}
            style={[styles.tabBtn, active === ex.id && styles.tabBtnActive]}
          >
            <Text style={[styles.tabText, active === ex.id && styles.tabTextActive]}>
              {ex.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={{ flex: 1 }}>
        <ActiveComp />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  menuBar: {
    flexDirection: "row",
    backgroundColor: colors.bg,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  tabBtnActive: { backgroundColor: colors.blue },
  tabText: { fontSize: 13, fontWeight: "600", color: colors.text },
  tabTextActive: { color: "#fff" },
});