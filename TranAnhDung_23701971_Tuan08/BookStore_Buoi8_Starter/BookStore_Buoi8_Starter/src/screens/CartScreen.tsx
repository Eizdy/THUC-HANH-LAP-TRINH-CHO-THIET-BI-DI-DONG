import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TodoBox } from "../components/TodoBox";
import { Header } from "../components/Header";
import { CartItemRow } from "../components/CartItemRow";
import { PrimaryButton } from "../components/PrimaryButton";
import { useAuth } from "../store/hooks";
import { EmptyState } from "../components/EmptyState";
import { useCart } from "../store/hooks";
import { confirmDialog } from "../utils/dialog"; // đã viết sẵn — dùng ở BT8.7a
import { TabScreenProps } from "../navigation/types";
import { colors, formatPrice } from "../theme";

export function CartScreen({ navigation }: TabScreenProps<"Cart">) {
  const { items, totalPrice, setQty, remove } = useCart();
  const finalTotal = totalPrice; // TODO BT8.C2 (thử thách): trừ mã giảm giá → finalTotal = totalPrice - discount

  const askRemove = (bookId: number) => {
    // Tìm sản phẩm để lấy tên hiển thị trong thông báo
    const item = items.find((i) => i.bookId === bookId);
    
    // Gọi hộp thoại xác nhận (đã được bọc sẵn trong utils/dialog.ts để chạy được cả trên web)
    confirmDialog(
      "Xóa sản phẩm", 
      `Xóa "${item?.title ?? "sản phẩm"}" khỏi giỏ hàng?`, 
      () => remove(bookId)
    );
  };

  const { isLoggedIn } = useAuth(); // (Đã có sẵn ở đầu component)

  const goCheckout = () => {
    if (isLoggedIn) {
      // Đã đăng nhập -> vào thẳng Checkout
      navigation.navigate("Checkout", { total: finalTotal });
    } else {
      // Chưa đăng nhập -> chuyển sang Login kèm theo thông tin đích đến
      navigation.navigate("Login", { redirectTo: "Checkout", total: finalTotal });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="🛒 Giỏ hàng" />
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.bookId)}
        renderItem={({ item }) => <CartItemRow item={item} onChangeQty={setQty} onRemove={askRemove} />}
        contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
        ListEmptyComponent={
          <EmptyState emoji="🛒" title="Giỏ hàng trống" message="Hãy chọn vài cuốn sách yêu thích nhé." actionLabel="Khám phá sách" onAction={() => navigation.navigate("Home")} />
        }
      />
      {items.length > 0 && (
        <View style={styles.footer}>
          <TodoBox id="BT8.C2">{"THỬ THÁCH: ô nhập mã giảm giá (SALE10 giảm 10%, GIAM50K giảm 50.000đ) + dòng “Giảm giá” + tổng cộng mới."}</TodoBox>
          <View style={styles.line}><Text style={styles.muted}>Tạm tính</Text><Text style={styles.value}>{formatPrice(totalPrice)}</Text></View>
          <View style={styles.line}><Text style={styles.total}>Tổng cộng</Text><Text style={styles.total}>{formatPrice(finalTotal)}</Text></View>
          <PrimaryButton title="Thanh toán" onPress={goCheckout} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  footer: { backgroundColor: "#fff", padding: 14, gap: 8, borderTopWidth: 1, borderTopColor: colors.line },
  line: { flexDirection: "row", justifyContent: "space-between" },
  muted: { color: colors.muted },
  value: { fontWeight: "700", color: colors.text },
  total: { fontSize: 17, fontWeight: "800", color: colors.navy },
});
