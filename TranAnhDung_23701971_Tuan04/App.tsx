import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CartScreen } from './screens/CartScreen';
import { TabBar, TabKey } from './components/TabBar';
import { BOOKS, CART_ITEMS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [cartCount, setCartCount] = useState(0);

  const selectedBook = BOOKS.find((b) => b.id === selectedBookId) ?? null;

  if (selectedBook) {
    return (
      <SafeAreaView style={styles.root}>
        <BookDetailScreen
          book={selectedBook}
          onBack={() => setSelectedBookId(null)}
          onAddToCart={() => {
            setCartCount((n) => n + 1);
            setSelectedBookId(null);
          }}
        />
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root}>
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
