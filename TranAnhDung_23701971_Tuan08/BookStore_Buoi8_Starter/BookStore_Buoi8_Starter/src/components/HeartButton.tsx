import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { colors } from "../theme";
import { useWishlist } from "../store/hooks";

interface Props {
  bookId: number;
  size?: number;
  style?: ViewStyle;
}

export function HeartButton({ bookId, size = 34, style }: Props) {
  // Lấy trạng thái và hàm toggle từ store
  const { isFavorite, toggle } = useWishlist();
  const fav = isFavorite(bookId);

  return (
    <Pressable
      style={style}
      onPress={() => toggle(bookId)}
      accessibilityLabel={fav ? "Bỏ yêu thích" : "Yêu thích"}
      hitSlop={8}
    >
      <Text style={{ fontSize: size, color: fav ? colors.heart : colors.muted }}>
        {fav ? "♥" : "♡"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { position: "absolute", top: 8, right: 8, backgroundColor: "rgba(255,255,255,0.92)", alignItems: "center", justifyContent: "center", zIndex: 2 },
});
