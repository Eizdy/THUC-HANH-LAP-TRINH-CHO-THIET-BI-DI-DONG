const doTask = (id: number) => new Promise(res => setTimeout(() => res(`Dữ liệu ${id}`), 1000));

const queueProcess = async () => {
    const queue = [1, 2, 3, 4, 5];
    
    console.time("Thời gian Queue Process");
    for (const id of queue) {
        // Đợi task hiện tại xong mới lặp tiếp sang task sau
        const result = await doTask(id); 
        console.log(`Đã xử lý xong: ${result}`);
    }
    console.timeEnd("Thời gian Queue Process"); // Sẽ mất khoảng 5s
};

queueProcess();