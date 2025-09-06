import { useContext, useEffect, useState } from 'react'
import { fetchLeaderBoard } from '../../services/UserService';
import { UserContext } from '../../components/UserContext'
import { header } from '../../../helper/util'
import './LeaderBoard.css'

export default () => {
    const [data, loading, error, fetchRankDetails] = fetchLeaderBoard();
    const { user, leaderBoard, setLeaderBoard, currentUserPoints } = useContext(UserContext);
    useEffect(() => {
        if (data.length === 0 && leaderBoard.length === 0) {
            fetchRankDetails({ currentUserPoints, id: user?.USER_ID })
        }
    }, [])

    useEffect(() => {
        if (leaderBoard.length === 0) {
            setLeaderBoard(data);
        }
    }, [data])

    const row = (className, element) => {
        const playerStyle = className + (user?.USER_ID === element.id ? ' current-player ' : '');
        return (
            <div key={element.id} className={playerStyle}>
                <div className='leader element'>{user?.USER_ID === element.id ? '?' : element.rank}</div>
                <div className='leader element'>{element.userName}</div>
                <div className='leader element'>{element.noOfMatches}</div>
                <div className='leader element'>{element.noOfWins}</div>
                <div className='leader element'>{element.points}</div>
            </div>
        )
    }

    const leaderBoardElement = <div className='leader box'>
        {row('leader row header', header(leaderBoard))}
        <div className='leader rows'>
            {leaderBoard.map(element => (row('leader row', element)))}
        </div>
    </div>

    return loading ? <div>Loading...</div> : error ? <div>Failed to load Leader Board</div> : leaderBoardElement;
}