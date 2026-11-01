import React, { useState, useEffect, useCallback, useMemo } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Header } from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { CategoryChips } from "../components/CategoryChips";
import { PriceFilter } from "../components/PriceFilter";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { EmptyState } from "../components/EmptyState";
import { LoadingView } from "../components/LoadingView";
import { ErrorView } from "../components/ErrorView";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import { getErrorMessage } from "../api/client";
import { useDebounce } from "../hooks/useDebounce";
import { filterBooks, PriceRange } from "../utils/filters";
import { useCart } from "../store/hooks";
import { Book, Category } from "../types";
import { TabScreenProps } from "../navigation/types";
import { colors } from "../theme";

export function HomeScreen({ navigation, route }: TabScreenProps<"Home">) {
  const { totalQuantity } = useCart(); // BT7.3d

  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<PriceRange>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null); // Bổ sung Câu 5 (Sắp xếp giá)

  // BT7.5b: Gọi API song song lấy sách và danh mục
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, c] = await Promise.all([getBooks(), getCategories()]);
      setBooks(b);
      setCategories(c);
    } catch (e) {
      setError(getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // BT7.8b: Nhận categoryId từ tab Danh mục chuyển sang
  useEffect(() => {
    const id = route.params?.categoryId;
    if (id !== undefined) {
      setCategoryId(id);
      navigation.setParams({ categoryId: undefined });
    }
  }, [route.params?.categoryId, navigation]);

  const debouncedKeyword = useDebounce(keyword, 400); // BT7.7a

  // BT7.7c: Lọc kết hợp từ khóa, danh mục, khoảng giá và sắp xếp
  const visibleBooks = useMemo(() => {
    const filtered = filterBooks(books, {
      keyword: debouncedKeyword,
      categoryId,
      priceRange,
    });
    if (!sortOrder) return filtered;
    return [...filtered].sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [books, debouncedKeyword, categoryId, priceRange, sortOrder]);

  // BT7.7e: Kiểm tra trạng thái có đang bật bộ lọc hay không
  const hasFilter =
    keyword !== "" || categoryId !== null || priceRange !== null || sortOrder !== null;

  const clearFilters = () => {
    setKeyword("");
    setCategoryId(null);
    setPriceRange(null);
    setSortOrder(null);
  };

  return (
    <View style={styles.container}>
      <Header title="📚 BookStore" onSearchPress={() => setSearchOpen((v) => !v)} />
      {searchOpen && (
        <SearchBar
          value={keyword}
          onChangeText={setKeyword}
          onClose={() => {
            setSearchOpen(false);
            setKeyword("");
          }}
        />
      )}

      {/* BT7.5c: Hiển thị theo 3 trạng thái loading / error / dữ liệu */}
      {loading ? (
        <LoadingView label="Đang tải sách…" />
      ) : error ? (
        <ErrorView message={error} onRetry={load} />
      ) : (
        <BookGrid
          data={visibleBooks}
          onPressBook={(b) => navigation.navigate("BookDetail", { bookId: b.id })} // BT7.2a
          ListHeaderComponent={
            <View>
              <CategoryChips
                categories={categories}
                selectedId={categoryId}
                onSelect={setCategoryId}
              />
              <PriceFilter value={priceRange} onChange={setPriceRange} />
              {hasFilter && (
                <Pressable style={styles.clearBtn} onPress={clearFilters}>
                  <Text style={styles.clearText}>✕ Xóa bộ lọc</Text>
                </Pressable>
              )}
            </View>
          }
          ListEmptyComponent={
            <EmptyState
              emoji="🔎"
              title="Không tìm thấy sách phù hợp"
              message="Hãy thử từ khoá khác hoặc bỏ bớt bộ lọc."
              actionLabel="Xóa bộ lọc"
              onAction={clearFilters}
            />
          }
        />
      )}

      <FloatingCartButton
        count={totalQuantity}
        onPress={() => navigation.navigate("Cart")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  clearBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginLeft: 16,
    marginTop: 8,
    backgroundColor: "#ffebee",
    borderRadius: 8,
  },
  clearText: { color: "#c62828", fontWeight: "600", fontSize: 13 },
});