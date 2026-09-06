const simulateTask = (time: number): Promise<string> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
};

const runRace = () => {
    Promise.race([
        simulateTask(2000),
        simulateTask(500),
        simulateTask(1000)
    ]).then((firstResult) => {
        console.log("Kết quả Promise.race:", firstResult);
    });
};

runRace();