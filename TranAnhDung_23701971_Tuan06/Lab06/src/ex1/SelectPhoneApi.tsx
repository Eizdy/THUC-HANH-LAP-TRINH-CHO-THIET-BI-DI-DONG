import React, { useCallback, useEffect, useState } from "react";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { ErrorBox } from "../components/ErrorBox";
import { Loading } from "../components/Loading";
import { SelectPhoneApp } from "./SelectPhoneApp";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setPhone(null);
    try {
      const data = await fetchPhone("1");
      setPhone(data);
    } catch (e: any) {
      setError(e instanceof Error ? e.message : "Đã xảy ra lỗi tải dữ liệu");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (error) {
    return <ErrorBox message={error} onRetry={load} />;
  }

  if (!phone) {
    return <Loading />;
  }

  return <SelectPhoneApp phone={phone} />;
}