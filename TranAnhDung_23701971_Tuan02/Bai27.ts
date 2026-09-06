const fetchWithRetry = async (url: string, retries: number): Promise<any> => {
    for (let i = 0; i < retries; i++) {
        try {
            console.log(`Đang gọi API lần ${i + 1}...`);
            const response = await fetch(url);
            
            // Nếu mã lỗi 404, 500,... thì fetch không tự vào catch, ta phải tự ném lỗi
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            
            return await response.json(); // Thành công thì thoát vòng lặp và trả về luôn
        } catch (error: any) {
            console.log(`Lần ${i + 1} thất bại: ${error.message}`);
            // Nếu đã thử đến lần cuối mà vẫn lỗi thì báo lỗi ra ngoài
            if (i === retries - 1) throw new Error("Hết số lần thử lại, bỏ cuộc!");
        }
    }
};

// Chạy thử với 1 URL sai cố ý:
fetchWithRetry("https://jsonplaceholder.typicode.com/loi-cung-duong", 3)
    .catch(e => console.log("Bài 27 - Kết quả cuối:", e.message));