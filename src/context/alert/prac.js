const fetchUsers = (id, callback) => {
    setTimeout(() => {
        const userData = { id: 123, name: "Tim" };
        callback(userData);
    }, 2000);
};

const displayUsers = (userData) => {
    console.log("User Data:", userData);
};

fetchUsers(123, displayUsers);
console.log("Fetching users data...");
