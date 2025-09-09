import type { User } from "../types/user";

export const getCurrentUser = (): User | null => {
    const userData = localStorage.getItem('authUser');

    if (userData) {
        const parsedUser = JSON.parse(userData);
        return parsedUser as User;
    }

    return null;
}