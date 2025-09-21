import { useContext, useEffect } from 'react';
import { fetchFriendsOfUser } from '../../services/UserService';
import { UserContext } from '../../components/UserContext';

export default () => {
    const [data, loading, error, fetchFriends] = fetchFriendsOfUser();
    const { user, friends, setFriends } = useContext(UserContext);
    useEffect(() => {
        if (data.length === 0 && friends.length === 0) {
            fetchFriends({ userId: user?.USER_ID })
        }
    }, [])

    useEffect(() => {
        if (friends.length === 0) {
            setFriends(data);
        }
    }, [data])

    const friendsBoard = friends.map(friend => {
        return <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <span>{friend.userName}</span>
            <span style={{ color: 'green' }}>Wins: {friend.wins ?? 0}</span>
            <span style={{ color: 'red' }}>Loss: {friend.loss ?? 0}</span>
        </div>
    });

    return loading ? <div>Loading...</div> : error ? <div>Failed to Load Friends</div> : friendsBoard;
}