// GIỜ 4 + GIỜ 5 — Tổng hợp toàn ứng dụng BookStore
// Giờ 4: SafeAreaView, HomeScreen (Header + ScrollView + FloatingCartButton),
//        BookDetailScreen (ScrollView + thanh đáy cố định)
// Giờ 5: TabBar cố định 4 mục + CartScreen (danh sách cuộn + tổng tiền cố định)
import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { TabBar, TabKey } from './components/TabBar';
import { BOOKS, CART_ITEMS } from './data';

export default function App() {
  // Tab đang active ('home' | 'category' | 'cart' | 'account')
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  // null = đang ở danh sách; number = id cuốn sách đang xem chi tiết
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;

  // Khi đang xem chi tiết sách -> ẩn TabBar, hiện BookDetailScreen toàn màn
  if (selectedBook) {
    return (
      <SafeAreaView style={styles.root}>
        <BookDetailScreen
          book={selectedBook}
          onBack={() => setSelectedBookId(null)}
          onAddToCart={() => {
            setCartCount((n) => n + 1);
            setSelectedBookId(null); // quay về Home sau khi thêm
          }}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    // SafeAreaView bọc ngoài cùng: tránh tai thỏ/thanh trạng thái iOS
    <SafeAreaView style={styles.root}>
      {/* flex:1 -> containing block cho TabBar (position:'absolute') */}
      <View style={styles.body}>
        {activeTab === 'home' && (
          <HomeScreen
            cartCount={cartCount}
            onPressBook={(id) => setSelectedBookId(id)}
            onPressCart={() => setActiveTab('cart')}
          />
        )}
        {activeTab === 'cart' && (
          <CartScreen items={CART_ITEMS} />
        )}
        {(activeTab === 'category' || activeTab === 'account') && (
          <View style={styles.placeholder}>
          </View>
        )}

        {/* TabBar: absolute bottom=0, nằm NGOÀI nội dung cuộn
            -> luôn cố định ở đáy màn hình dù đang ở tab nào */}
        <TabBar active={activeTab} onChange={setActiveTab} />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  body: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
});
