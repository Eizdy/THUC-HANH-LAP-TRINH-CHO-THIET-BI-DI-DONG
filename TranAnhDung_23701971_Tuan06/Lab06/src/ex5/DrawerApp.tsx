import React, { createContext, useContext, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

interface SettingsCtx {
  notify: boolean;
  setNotify: (v: boolean) => void;
  dark: boolean;
  setDark: (v: boolean) => void;
}
const AppSettingsContext = createContext<SettingsCtx>(null!);

function HomeScreen() {
  const { dark } = useContext(AppSettingsContext);
  return (
    <View style={[s.center, dark && s.darkBg]}>
      <Text style={[s.big, dark && s.darkText]}>Xin chào 👋</Text>
    </View>
  );
}

function ProfileScreen() {
  const { dark } = useContext(AppSettingsContext);
  return (
    <View style={[s.center, dark && s.darkBg]}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>TD</Text>
      </View>
      <Text style={[s.big, dark && s.darkText]}>Trần Anh Dũng</Text>
      <Text style={[s.muted, dark && { color: "#9CA3AF" }]}>MSSV: 23701971</Text>
      <Text style={[s.muted, dark && { color: "#9CA3AF" }]}>dung.tran@student.iuh.edu.vn</Text>
    </View>
  );
}

function SettingsScreen() {
  const { notify, setNotify, dark, setDark } = useContext(AppSettingsContext);

  return (
    <View style={[s.settingsWrap, dark && s.darkBg]}>
      <View style={s.settingRow}>
        <Text style={[s.label, dark && s.darkText]}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>

      <View style={s.settingRow}>
        <Text style={[s.label, dark && s.darkText]}>Chế độ tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>

      <Text style={[s.status, dark && s.darkText]}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "tối" : "sáng"}
      </Text>
    </View>
  );
}

const DRAWER_ICONS: Record<keyof DrawerParamList, keyof typeof Ionicons.glyphMap> = {
  Home: "home-outline",
  Profile: "person-outline",
  Settings: "settings-outline",
};

export function DrawerApp() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <AppSettingsContext.Provider value={{ notify, setNotify, dark, setDark }}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={({ route }) => ({
            drawerActiveTintColor: colors.red,
            drawerIcon: ({ color, size }) => (
              <Ionicons name={DRAWER_ICONS[route.name]} size={size} color={color} />
            ),
          })}
        >
          <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
          <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Hồ sơ" }} />
          <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AppSettingsContext.Provider>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", gap: 8, backgroundColor: "#fff" },
  darkBg: { backgroundColor: "#1F2430" },
  darkText: { color: "#fff" },
  big: { fontSize: 22, fontWeight: "bold", color: colors.text },
  muted: { fontSize: 15, color: colors.muted },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarText: { color: "#fff", fontSize: 28, fontWeight: "bold" },
  settingsWrap: { flex: 1, padding: 20, gap: 16, backgroundColor: "#fff" },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  label: { fontSize: 16, color: colors.text },
  status: { marginTop: 16, fontSize: 15, fontWeight: "600", color: colors.blue },
});