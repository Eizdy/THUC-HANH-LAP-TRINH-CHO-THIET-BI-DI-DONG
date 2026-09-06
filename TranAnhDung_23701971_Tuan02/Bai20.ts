const slowApiCall = (): Promise<string> => {
    // Giả lập API chạy mất 3 giây (cố tình để cho quá thời gian timeout)
    return new Promise(resolve => setTimeout(() => resolve("Dữ liệu từ API"), 3000));
};

const timeoutLimit = (ms: number): Promise<never> => {
    return new Promise((_, reject) => setTimeout(() => reject(new Error("Request Timeout: Quá thời gian chờ!")), ms));
};

const fetchWithTimeout = async () => {
    try {
        const result = await Promise.race([
            slowApiCall(), 
            timeoutLimit(2000)
        ]);
        console.log("Thành công:", result);
    } catch (error: any) {
        console.error("Bài 20 - Lỗi:", error.message);
    }
};

fetchWithTimeout();