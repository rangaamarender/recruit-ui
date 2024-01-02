// api/authApi.js
const users = [
    { id: 1, username: 'user1', password: 'password1', role: 'user' },
    { id: 2, username: 'user2', password: 'password1', role: 'manager' },
    { id: 3, username: 'admin', password: 'password1', role: 'admin' },
];

export const authApi = {
    login: (username, password) => {
        return new Promise((resolve, reject) => {
            const user = users.find((u) => u.username === username && u.password === password);
            if (user) {
                // Simulate token generation
                const token = `mockToken_${user.id}_${Date.now()}`;
                const isAuthenticated = true;
                const role=user.role;
                const username = user.username
                resolve({ ok: true, data: { token, isAuthenticated, role, username } });
            } else {
                reject({ ok: false, error: 'Invalid credentials' });
            }
        });
    },
};
