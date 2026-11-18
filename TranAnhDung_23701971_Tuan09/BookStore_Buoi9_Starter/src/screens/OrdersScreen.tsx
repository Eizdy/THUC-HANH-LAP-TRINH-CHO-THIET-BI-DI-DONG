import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StatusBadge } from "../components/StatusBadge";
import { PrimaryButton } from "../components/PrimaryButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { TodoBox } from "../components/TodoBox";
import { getOrdersByUser } from "../services/orderService";
import { getBooks } from "../services/bookService";
import { getErrorMessage } from "../api/client";
import { useAuth, useCart } from "../store/hooks";
import { formatDateTime } from "../utils/format";
import { showMessage } from "../utils/dialog";
import { RootScreenProps } from "../navigation/types";
import { Order } from "../types";
import { colors, formatPrice, radius } from "../theme";
import { FlatList, Pressable, Text } from "react-native";


export const PAYMENT_LABEL = { cod: "Thanh toán khi nhận hàng (COD)", bank: "Chuyển khoản ngân hàng" } as const;

export function OrdersScreen({ navigation }: RootScreenProps<"Orders">) {
  const { user, isLoggedIn } = useAuth();
  const { items: cartItems, add, setQty } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null); // đơn đang mở rộng (xem chi tiết ngay tại màn này)

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getOrdersByUser(user.id);
      // Sắp xếp giảm dần theo ngày tháng ở client để đảm bảo chính xác
      setOrders([...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt)));
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, [user]);

  // TODO BT9.C1 (thử thách "Mua lại"): thêm lại toàn bộ sản phẩm của đơn vào giỏ hiện tại
  const reorder = async (order: Order) => {
    void order; void getBooks; void cartItems; void add; void setQty; void showMessage;
  };

  if (!isLoggedIn) {
    return <EmptyState emoji="🔒" title="Bạn cần đăng nhập" actionLabel="Đăng nhập" onAction={() => navigation.navigate("Login")} />;
  }
  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={load} />;

  void StatusBadge; void PrimaryButton; void formatDateTime; void formatPrice; void radius; void colors; void reorder; void setOpenId; void openId;
  return (
    <View style={styles.container}>
     <FlatList
          data={orders}
          keyExtractor={(o) => String(o.id)}
          contentContainerStyle={{ padding: 12, gap: 10, flexGrow: 1 }}
          ListEmptyComponent={
            <EmptyState 
              emoji="🧾" 
              title="Bạn chưa có đơn hàng nào" 
              message="Đặt đơn đầu tiên để theo dõi tại đây."
              actionLabel="Mua sắm ngay" 
              onAction={() => navigation.navigate("Tabs", { screen: "Home" })} 
            />
          }
          renderItem={({ item: o }) => {
            const open = openId === o.id;
            return (
              <View style={styles.card}>
                <Pressable onPress={() => setOpenId(open ? null : o.id)} style={styles.head}>
                  <View style={{ flex: 1, gap: 2 }}>
                    <Text style={styles.code}>Đơn #{o.id}</Text>
                    <Text style={styles.date}>{formatDateTime(o.createdAt)}</Text>
                    <Text style={styles.total}>{formatPrice(o.total)}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end", gap: 6 }}>
                    <StatusBadge status={o.status} />
                    <Text style={styles.toggle}>{open ? "Thu gọn ▲" : "Chi tiết ▼"}</Text>
                  </View>
                </Pressable>
                {open && (
                  <View style={styles.detail}>
                    {o.items.map((it) => (
                      <View key={it.bookId} style={styles.itemRow}>
                        <Text style={styles.itemTitle} numberOfLines={1}>{it.title} × {it.quantity}</Text>
                        <Text style={styles.itemPrice}>{formatPrice(it.price * it.quantity)}</Text>
                      </View>
                    ))}
                    <View style={styles.addr}>
                      <Text style={styles.addrH}>Giao đến</Text>
                      <Text style={styles.addrT}>{o.address.name} · {o.address.phone}</Text>
                      <Text style={styles.addrT}>{o.address.address}</Text>
                      <Text style={styles.addrT}>Thanh toán: {PAYMENT_LABEL[o.paymentMethod]}</Text>
                    </View>
                  </View>
                )}
              </View>
            );
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  card: { backgroundColor: "#fff", borderRadius: radius.md, padding: 12 },
  head: { flexDirection: "row", justifyContent: "space-between" },
  code: { fontSize: 16, fontWeight: "800", color: colors.navy },
  date: { fontSize: 13, color: "#666" },
  total: { fontSize: 14, fontWeight: "800", color: colors.indigo },
  toggle: { fontSize: 13, color: "#666", fontWeight: "600" },
  detail: { borderTopWidth: 1, borderTopColor: colors.line, marginTop: 12, paddingTop: 12, gap: 8 },
  itemRow: { flexDirection: "row", justifyContent: "space-between", gap: 8 },
  itemTitle: { flex: 1, color: colors.text },
  itemPrice: { fontWeight: "700", color: colors.text },
  addr: { backgroundColor: colors.bg, padding: 10, borderRadius: radius.sm, marginTop: 4 },
  addrH: { fontWeight: "700", color: colors.navy, marginBottom: 4 },
  addrT: { fontSize: 13, color: colors.text, marginBottom: 2 },
});