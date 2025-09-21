import { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toStringify } from '../../helper/util';
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [leaderBoard, setLeaderBoard] = useState([]);
    const [friends, setFriends] = useState([]);
    const [currentUserPoints, setCurrentUserPoints] = useState(0);
    const navigate = useNavigate();

    const login = (userData) => {
        setUser(userData);
        setCurrentUserPoints(userData.points)
        window.localStorage.setItem('token', userData.token)
        window.localStorage.setItem('userData', toStringify(userData))
    };

    const logout = (removeSessionInfo = false) => {
        setUser(null);
        setLeaderBoard([]);
        setFriends([]);
        setCurrentUserPoints(0);
        if (removeSessionInfo) {
            removeSessionInformation()
        }
        navigate('/')
    };

    const removeSessionInformation = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('userData')
    }

    return (
        <UserContext.Provider value={{ user, login, logout, leaderBoard, setLeaderBoard, friends, setFriends, currentUserPoints, removeSessionInformation }}>
            {children}
        </UserContext.Provider>
    );
};
