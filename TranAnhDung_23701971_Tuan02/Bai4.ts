const randomPromise = new Promise<number>((resolve, reject) => {
    const num = Math.random();
    if (num > 0.5) {
        resolve(num);
    } else {
        reject(new Error(`Số quá nhỏ: ${num}`));
    }
});

randomPromise
    .then((result) => {
        console.log("Thành công! Số ngẫu nhiên là:", result);
    })
    .catch((error) => {
        console.error("Thất bại:", error.message);
    });