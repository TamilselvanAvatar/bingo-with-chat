import { createContext, useState } from 'react';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [leaderBoard, setLeaderBoard] = useState([]);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, leaderBoard, setLeaderBoard }}>
            {children}
        </UserContext.Provider>
    );
};
