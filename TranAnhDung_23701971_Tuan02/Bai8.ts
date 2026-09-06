Promise.resolve(2)
    .then((num) => num ** 2)
    .then((num) => num * 2) 
    .then((num) => num + 5)
    .then((finalResult) => {
        console.log("Kết quả chuỗi Promise:", finalResult);
    });