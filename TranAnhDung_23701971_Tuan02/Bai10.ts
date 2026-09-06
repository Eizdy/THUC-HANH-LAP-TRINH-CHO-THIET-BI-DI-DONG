const checkFinally = () => {
    const isSuccess = Math.random() > 0.5;

    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            isSuccess ? resolve("Thành công!") : reject(new Error("Thất bại!"));
        }, 1000);
    });

    myPromise
        .then((res) => console.log(res))
        .catch((err) => console.error(err.message))
        .finally(() => {
            console.log("Done");
        });
};

checkFinally();