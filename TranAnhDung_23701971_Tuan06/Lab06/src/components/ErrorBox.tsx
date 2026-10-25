import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function ErrorBox({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <View style={styles.center}>
      <Text style={styles.errText}>Lỗi: {message}</Text>
      <Pressable style={styles.btn} onPress={onRetry}>
        <Text style={styles.btnText}>THỬ LẠI</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, gap: 12 },
  errText: { color: colors.red, fontSize: 15, textAlign: "center" },
  btn: { backgroundColor: colors.blue, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 6 },
  btnText: { color: "#fff", fontWeight: "bold" },
});