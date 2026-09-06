const simulateTask = (time: number): Promise<string> => {
    return new Promise((resolve) => setTimeout(() => resolve("Task done"), time));
};

const runTask = async () => {
    console.log("Đang xử lý...");
    const result = await simulateTask(2000);
    console.log("Bài 12:", result);
};

runTask();