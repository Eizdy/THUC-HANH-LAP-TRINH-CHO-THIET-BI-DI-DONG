import React, {useState, useEffect} from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CartItem } from "../types";
import { colors, formatPrice, radius } from "../theme";
import { useDebounce } from "../hooks/useDebounce";

interface Props {
  item: CartItem;
  onChangeQty: (bookId: number, quantity: number) => void;
  onRemove: (bookId: number) => void;
}


export function CartItemRow({ item, onRemove, onChangeQty }: Props) {
  // 1. Dùng state cục bộ để giao diện phản hồi tức thì
const [qty, setQty] = useState(item.quantity);
  
// 2. Trì hoãn việc lấy giá trị cuối cùng (đợi 300ms sau khi ngừng bấm)
const debouncedQty = useDebounce(qty, 300);

// 3. Khi giá trị debounced thay đổi, đẩy lên store
useEffect(() => {
  if (debouncedQty !== item.quantity) {
    onChangeQty(item.bookId, debouncedQty);
  }
}, [debouncedQty]);

// 4. Đồng bộ ngược lại từ store nếu dữ liệu thay đổi từ nơi khác
useEffect(() => {
  setQty(item.quantity);
}, [item.quantity]);

// 5. Kiểm tra điều kiện vô hiệu hóa nút bấm
const canDec = qty > 1;
const canInc = qty < item.stock;
  return (
    <View style={styles.row}>
      <View style={[styles.cover, { backgroundColor: item.color }]}>
        <Text style={styles.emoji}>{item.emoji}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        <View style={styles.row}>
          <Pressable 
            disabled={!canDec} 
            onPress={() => setQty((q) => q - 1)} 
            accessibilityLabel="Giảm"
          >
            <Text style={{ opacity: canDec ? 1 : 0.3 }}>−</Text>
          </Pressable>
          
          <Text>{qty}</Text>
          
          <Pressable 
            disabled={!canInc} 
            onPress={() => setQty((q) => q + 1)} 
            accessibilityLabel="Tăng"
          >
            <Text style={{ opacity: canInc ? 1 : 0.3 }}>+</Text>
          </Pressable>
          
          <Text style={styles.stock}>Còn {item.stock}</Text>
        </View>      </View>
      <Text style={styles.qty}>x{item.quantity}</Text>
      <Pressable onPress={() => onRemove(item.bookId)} hitSlop={8} accessibilityLabel="Xóa khỏi giỏ">
        <Text style={styles.trash}>🗑️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", backgroundColor: colors.card, borderRadius: radius.md, padding: 10, marginHorizontal: 12, marginVertical: 5, gap: 10 },
  cover: { width: 54, height: 72, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  emoji: { fontSize: 26 },
  info: { flex: 1, gap: 2 },
  title: { fontWeight: "700", color: colors.text },
  price: { color: colors.indigo, fontWeight: "800" },
  todo: { borderWidth: 1.5, borderStyle: "dashed", borderColor: colors.warning, borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2, backgroundColor: "#FFFBEB", alignSelf: "flex-start", marginTop: 4 },
  todoText: { color: "#B45309", fontSize: 11, fontWeight: "700" },
  qty: { fontWeight: "800", color: colors.navy, fontSize: 16 },
  trash: { fontSize: 22 },
  stock: { fontSize: 12, color: colors.muted, marginLeft: 8 },
});
