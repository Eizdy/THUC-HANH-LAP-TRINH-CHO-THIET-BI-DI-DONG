const getPromisedData = (val: string, ms: number) => new Promise(res => setTimeout(() => res(val), ms));

const loopPromises = async () => {
    const promises = [
        getPromisedData("Dữ liệu A", 1000),
        getPromisedData("Dữ liệu B", 500),
        getPromisedData("Dữ liệu C", 1500)
    ];

    for await (const result of promises) {
        console.log("Bài 17 - Đã lấy được:", result);
    }
};

loopPromises();