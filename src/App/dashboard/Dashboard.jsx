import { useState } from 'react';
import SideNav from './sideNav';
import './dashboard.css';
import { DASHBOARD } from '../../helper/generalConstants';
import LeaderBoard from './leaderBoard/leaderBoard';

export default () => {
    const [selectedBoard, setSelectedBoard] = useState('');
    const activeBoard = () => {
        switch (selectedBoard) {
            case DASHBOARD.LEADER_BORAD: {
                return <LeaderBoard />
            }
            default: {
                return <>DASH BOARD</>
            }
        }
    }
    const onSelectDashBoard = (selectedDashBoard) => {
        setSelectedBoard(selectedDashBoard)
    }
    return (
        <div className='container'>
            <div className='inner-container'>
                <div className='side-nav'>
                    <SideNav onSelectDashBoard={onSelectDashBoard} />
                </div>
                <div className='dashboard-body'>
                    {activeBoard()}
                </div>
            </div>
        </div>
    )
}