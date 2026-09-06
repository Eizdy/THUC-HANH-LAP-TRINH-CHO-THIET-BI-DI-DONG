type UserData = { id: number; name: string };

const getSingleUser = async (id: number): Promise<UserData> => {
    return new Promise((resolve) => setTimeout(() => resolve({ id, name: `User_${id}` }), 1000));
};

const fetchUsers = async (ids: number[]) => {
    const userPromises = ids.map(id => getSingleUser(id));
    const users = await Promise.all(userPromises);
    return users;
};

const run19 = async () => {
    const allUsers = await fetchUsers([1, 2, 3]);
    console.log("Bài 19 - Danh sách users:", allUsers);
};
run19();