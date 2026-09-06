const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const sayHelloAsync = async () => {
    await delay(2000);
    return "Hello Async";
};

const run11 = async () => {
    const result = await sayHelloAsync();
    console.log("Bài 11:", result);
};
run11();