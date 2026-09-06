const task = (id: number, ms: number) => new Promise(res => setTimeout(() => res(`Task ${id} xong`), ms));

const runSequentially = async () => {
    console.time("Thời gian chạy tuần tự");
    
    const res1 = await task(1, 1000);
    console.log(res1);
    
    const res2 = await task(2, 1000);
    console.log(res2);
    
    console.timeEnd("Thời gian chạy tuần tự"); 
};

runSequentially();