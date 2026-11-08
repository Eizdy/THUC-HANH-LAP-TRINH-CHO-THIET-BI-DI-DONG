import { useEffect } from "react";
import { saveJSON } from "../storage/storage";

export function useAutoPersist<T>(key: string, value: T, ready: boolean) {
  useEffect(() => {
    // Chỉ ghi vào bộ nhớ máy khi app đã khởi động xong (ready = true)
    // Tránh tình trạng ghi đè mảng rỗng lúc app mới mở lên
    if (ready) {
      saveJSON(key, value);
    }
  }, [key, value, ready]);
}
