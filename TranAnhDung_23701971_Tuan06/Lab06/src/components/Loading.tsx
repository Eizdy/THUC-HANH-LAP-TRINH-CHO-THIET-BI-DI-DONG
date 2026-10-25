import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";

export function Loading() {
  return (
    <View style={styles.center}>
      <ActivityIndicator size="large" color={colors.blue} />
      <Text style={styles.text}>Đang tải...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", gap: 10 },
  text: { color: colors.muted, fontSize: 15 },
});