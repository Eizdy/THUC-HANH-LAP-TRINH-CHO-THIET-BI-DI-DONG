import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme";
import { Pressable } from "react-native";
interface Props {
  value: number; // 0–5 (có thể lẻ, làm tròn khi vẽ)
  size?: number;
  onChange?: (v: number) => void; // có truyền → cho phép bấm chọn sao
}

export function RatingStars({ value, size = 18, onChange }: Props) {
  const filled = Math.round(value);
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((n) => {
        // Tạo icon ngôi sao, nếu thứ tự <= giá trị làm tròn thì tô màu vàng, ngược lại màu xám
        const star = <Text key={n} style={{ fontSize: size, color: n <= filled ? colors.warning : colors.line }}>★</Text>;
        
        // Nếu component có truyền hàm onChange (dùng trong form) thì bọc Pressable để bấm được
        return onChange ? (
          <Pressable key={n} onPress={() => onChange(n)} hitSlop={4} accessibilityLabel={`${n} sao`}>
            {star}
          </Pressable>
        ) : star;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
