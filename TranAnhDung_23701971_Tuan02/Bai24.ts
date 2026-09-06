const postData = async () => {
    const newData = { title: "Học TypeScript", body: "Rất thú vị", userId: 1 };

    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData) 
    });

    const result = await response.json();
    console.log("Bài 24 - Kết quả POST:", result);
};

postData();