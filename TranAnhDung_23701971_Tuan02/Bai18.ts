type User = { id: number; name: string };

const fetchUser = async (id: number): Promise<User> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: id, name: `User_${id}` });
        }, 1000);
    });
};

const run18 = async () => {
    const user = await fetchUser(101);
    console.log("Bài 18 - Thông tin user:", user);
};
run18();