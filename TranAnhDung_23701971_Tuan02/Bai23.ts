type Todo = { userId: number; id: number; title: string; completed: boolean };

const fetchAndFilterTodos = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos: Todo[] = await response.json();
    
    const completedTodos = todos.filter(todo => todo.completed === true);
    
    console.log(`Bài 23 - Có tổng cộng ${completedTodos.length} công việc đã hoàn thành.`);
    console.log("Công việc đầu tiên là:", completedTodos[0].title);
};

fetchAndFilterTodos();