const taskItem = (id: number, ms: number) => new Promise(res => setTimeout(() => res(`Task ${id} xong`), ms));

const runInParallel = async () => {
    console.time("Thời gian chạy song song");
    
    const results = await Promise.all([
        taskItem(1, 1000),
        taskItem(2, 1000)
    ]);
    
    console.log("Kết quả:", results);
    console.timeEnd("Thời gian chạy song song");
};

runInParallel();