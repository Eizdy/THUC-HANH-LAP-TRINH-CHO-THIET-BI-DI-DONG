import React, {useEffect} from "react";
import { StyleSheet, Text, View } from "react-native";
import { RootScreenProps } from "../navigation/types";
import { colors, formatPrice } from "../theme";
import { useAuth } from "../store/hooks";


export function CheckoutScreen({ navigation, route }: RootScreenProps<"Checkout">) {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      // Dùng replace để thay thế màn hiện tại, tránh việc bấm back lại quay về màn Login
      navigation.replace("Login", { redirectTo: "Checkout", total: route.params.total });
    }
  }, [isLoggedIn, navigation, route.params.total]);

  // Nếu chưa đăng nhập thì không render (hiển thị) gì cả trong lúc chờ chuyển hướng
  if (!isLoggedIn) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tổng tiền cần thanh toán</Text>
      <Text style={styles.total}>{formatPrice(route.params.total)}</Text>
      <Text style={styles.note}>(Form địa chỉ & thanh toán sẽ làm ở buổi sau)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg, gap: 8 },
  label: { color: colors.muted, fontSize: 15 },
  total: { fontSize: 32, fontWeight: "800", color: colors.indigo },
  note: { color: colors.muted, marginTop: 12 },
});
