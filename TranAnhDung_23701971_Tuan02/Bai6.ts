const simulateTask = (time: number): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
};

const runParallel = () => {
    Promise.all([
        simulateTask(1000), 
        simulateTask(2000), 
        simulateTask(1500)
    ]).then((results) => {
        console.log("Kết quả Promise.all:", results); 
    });
};

runParallel();