import { createContext, useState } from 'react';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [leaderBoard, setLeaderBoard] = useState([]);
    const [currentUserPoints, setCurrentUserPoints] = useState(0)

    const login = (userData) => {
        setUser(userData);
        setCurrentUserPoints(userData.points)
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{ user, login, logout, leaderBoard, setLeaderBoard, currentUserPoints }}>
            {children}
        </UserContext.Provider>
    );
};
