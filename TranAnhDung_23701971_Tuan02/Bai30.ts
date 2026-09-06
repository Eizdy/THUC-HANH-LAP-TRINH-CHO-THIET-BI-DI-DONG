const fetchAllSettled = async () => {
    // API 1 thành công, API 2 thất bại (cố ý dùng Promise.reject)
    const p1 = fetch("https://jsonplaceholder.typicode.com/todos/1").then(res => res.json());
    const p2 = Promise.reject(new Error("Lỗi máy chủ 500"));
    
    const results = await Promise.allSettled([p1, p2]);
    
    console.log("Bài 30 - Trạng thái các Promise:");
    results.forEach((res, index) => {
        if (res.status === "fulfilled") {
            console.log(`API ${index + 1} Thành công:`, res.value);
        } else if (res.status === "rejected") {
            console.log(`API ${index + 1} Thất bại:`, res.reason.message);
        }
    });
};

fetchAllSettled();