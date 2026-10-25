import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";

type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<
  keyof TabParamList,
  [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]
> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

function HomeTab() {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 10 }}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Text style={s.cardTitle}>{item.name.split(" - ")[0]}</Text>
          <Text style={s.cardPrice}>{formatPrice(item.price)}</Text>
        </View>
      )}
    />
  );
}

// TODO 1: SearchTab
function SearchTab() {
  const [keyword, setKeyword] = useState("");
  const filtered = PHONES.filter((p) =>
    p.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa"
        style={s.input}
      />
      {filtered.length === 0 ? (
        <Text style={s.empty}>Không có kết quả cho “{keyword}”</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ gap: 10 }}
          renderItem={({ item }) => (
            <View style={s.card}>
              <Text style={s.cardTitle}>{item.name.split(" - ")[0]}</Text>
              <Text style={s.cardPrice}>{formatPrice(item.price)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

// TODO 2: ProfileTab
function ProfileTab() {
  return (
    <View style={s.profileCenter}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>TD</Text>
      </View>
      <Text style={s.profileName}>Trần Anh Dũng</Text>
      <Text style={s.profileEmail}>dung.tran@student.iuh.edu.vn</Text>
    </View>
  );
}

// TODO 3: BottomTabApp
export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.muted,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={ICONS[route.name][focused ? 0 : 1]}
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomeTab} options={{ title: "Trang chủ" }} />
        <Tab.Screen name="Search" component={SearchTab} options={{ title: "Tìm kiếm" }} />
        <Tab.Screen name="Profile" component={ProfileTab} options={{ title: "Cá nhân" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: { fontSize: 15, fontWeight: "500", color: colors.text },
  cardPrice: { fontSize: 14, fontWeight: "bold", color: colors.red },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  empty: { textAlign: "center", color: colors.muted, marginTop: 24, fontSize: 15 },
  profileCenter: { flex: 1, justifyContent: "center", alignItems: "center", gap: 8 },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarText: { color: "#fff", fontSize: 32, fontWeight: "bold" },
  profileName: { fontSize: 20, fontWeight: "bold", color: colors.text },
  profileEmail: { fontSize: 15, color: colors.muted },
});