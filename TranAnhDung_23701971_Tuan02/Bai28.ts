const doTask = (id: number) => new Promise(res => setTimeout(() => res(`Dữ liệu ${id}`), 1000));

const batchProcess = async () => {
    const tasks = [doTask(1), doTask(2), doTask(3), doTask(4), doTask(5)];
    
    console.time("Thời gian Batch Process");
    const results = await Promise.all(tasks);
    console.timeEnd("Thời gian Batch Process"); // Sẽ chỉ mất khoảng 1s cho cả 5 task
    
    console.log("Bài 28 - Kết quả:", results);
};

batchProcess();