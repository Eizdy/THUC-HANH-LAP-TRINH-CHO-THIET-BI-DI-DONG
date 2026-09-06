const fetchTodo = async () => {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        const data = await response.json();
        console.log("Bài 21 - Dữ liệu lấy được:", data);
    } catch (error) {
        console.error("Lỗi:", error);
    }
};

fetchTodo();