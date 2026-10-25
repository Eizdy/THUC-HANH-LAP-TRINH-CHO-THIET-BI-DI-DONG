import { Phone } from "../types";

declare const process: { env: Record<string, string | undefined> };

export const API_URL = "https://6adda8524e88f1bba4a488d8.mockapi.io/phones";

export async function fetchPhone(id: string): Promise<Phone> {
  const res = await fetch(`${API_URL}/phones/${id}`);
  if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);
  return (await res.json()) as Phone;
}