const filterEvenNumbers = (arr: number[]): Promise<number[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const evens = arr.filter((num) => num % 2 === 0);
            resolve(evens);
        }, 1000);
    });
};

filterEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8]).then((evens) => {
    console.log("Các số chẵn:", evens);
});