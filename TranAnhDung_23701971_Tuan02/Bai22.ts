const fetchMultipleTodos = async () => {
    const urls = [
        "https://jsonplaceholder.typicode.com/todos/1",
        "https://jsonplaceholder.typicode.com/todos/2"
    ];

    const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));
    
    const results = await Promise.all(fetchPromises);
    console.log("Bài 22 - Kết quả gọi nhiều lần:", results);
};

fetchMultipleTodos();