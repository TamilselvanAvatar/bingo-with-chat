import { useContext, useEffect, useState } from 'react'
import { fetchLeaderBoard } from '../../services/UserService';
import { UserContext } from '../../components/UserContext'
import { header } from '../../../helper/util'
import './LeaderBoard.css'

export default () => {
    const [data, loading, error, fetchRankDetails] = fetchLeaderBoard();
    const { leaderBoard, setLeaderBoard } = useContext(UserContext);
    useEffect(() => {
        if (data.length === 0 && leaderBoard.length === 0) {
            fetchRankDetails()
        }
    }, [])

    useEffect(() => {
        setLeaderBoard(data);
    }, [data])

    return <div className='leader box'>
        {
            [header(data), ...data].map(element => {
                const row = `leader row ${element.header ? 'header' : ''}`
                return (
                    <div key={element.id} className={row}>
                        <div className='leader element'>{element.rank}</div>
                        <div className='leader element'>{element.userName}</div>
                        <div className='leader element'>{element.noOfMatches}</div>
                        <div className='leader element'>{element.noOfWins}</div>
                        <div className='leader element'>{element.points}</div>
                    </div>
                )
            })
        }
    </div>
}