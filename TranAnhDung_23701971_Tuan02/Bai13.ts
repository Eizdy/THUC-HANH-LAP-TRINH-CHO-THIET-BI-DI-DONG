const failTask = (): Promise<string> => {
    return new Promise((_, reject) => setTimeout(() => reject(new Error("Lỗi mạng!")), 1000));
};

const handleError = async () => {
    try {
        const result = await failTask();
        console.log("Kết quả:", result);
    } catch (error: any) {
        console.error("Bài 13 - Bắt được lỗi:", error.message);
    }
};

handleError();