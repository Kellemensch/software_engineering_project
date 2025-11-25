// THIS INTERFACE IS NOT SECURE AT ALL!! and is used more mocking purposes than anything else

export interface User {
    firstname: string;
    lastname: string;
    birth: Date;
    email: string;
    phone?: string;
    groupId: number;
    type: UserType;

    // password is optional, because in most cases it is not passed along with other user data
    password?: string;
}

export type UserType = "salesperson" | "manager" | "accountant" | "admin";

let users: User[] = [];

/// Returns true if the given email and password match in the database
export function login(email: string, password: string) {
    return users.some(
        (user) => user.email === email && user.password === password,
    );
}

export function signup(userInfo: {
    firstname: string;
    lastname: string;
    birth: Date;
    email: string;
    phone?: string;
    password: string;
    type: UserType;
}) {
    users.push({ ...userInfo, groupId: 0 });
}

export function getUserData(email: string) {
    return users.find((u) => u.email == email);
}

export function deleteUser(email: string, password: string) {
    const user = users.find((u) => u.email == email && u.password == password);
    if (!user) return false;

    users = users.filter((u) => u != user);
}

export function getAllUsers() {
    return users.map((u) => {
        return {
            ...u,
            password: undefined, // redact the password
        };
    });
}
