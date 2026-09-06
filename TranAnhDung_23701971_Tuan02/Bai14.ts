const multiplyByThree = async (num: number): Promise<number> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * 3);
        }, 1000);
    });
};

const run14 = async () => {
    const result = await multiplyByThree(5);
    console.log("Bài 14 - Kết quả:", result); 
};
run14();