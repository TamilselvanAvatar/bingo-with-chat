import { DASHBOARD } from '../../helper/generalConstants'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './dashboard.css';
import { useState } from 'react';

export default ({ onSelectDashBoard }) => {
    const [active, setActive] = useState();
    const selectActiveDashBoard = (activeBoard) => {
        setActive(activeBoard);
        onSelectDashBoard(activeBoard);
    }

    return (
        <div className='icons'>
            <div className={`icons-align ${active === DASHBOARD.HOME ? 'active' : ''}`}>
                <FontAwesomeIcon icon={'home'} onClick={e => selectActiveDashBoard(DASHBOARD.HOME)} size='2x'> Home </FontAwesomeIcon>
            </div>
            <div className={`icons-align ${active === DASHBOARD.GAME_PLAY ? 'active' : ''}`}>
                <FontAwesomeIcon icon={'gamepad'} onClick={e => selectActiveDashBoard(DASHBOARD.GAME_PLAY)} size='2x'> Game </FontAwesomeIcon>
            </div>
            <div className={`icons-align ${active === DASHBOARD.LEADER_BORAD ? 'active' : ''}`}>
                <FontAwesomeIcon icon={'trophy'} onClick={e => selectActiveDashBoard(DASHBOARD.LEADER_BORAD)} size='2x'> Trophy </FontAwesomeIcon>
            </div>
            <div className={`icons-align ${active === DASHBOARD.FRIENDS ? 'active' : ''}`}>
                <FontAwesomeIcon icon={'user-group'} onClick={e => selectActiveDashBoard(DASHBOARD.FRIENDS)} size='2x'> Friends </FontAwesomeIcon>
            </div>
            <div className={`icons-align ${active === DASHBOARD.SETTINGS ? 'active' : ''}`}>
                <FontAwesomeIcon icon={'gear'} onClick={e => selectActiveDashBoard(DASHBOARD.SETTINGS)} size='2x'> Gear </FontAwesomeIcon>
            </div>
            <div className={`icons-align ${active === DASHBOARD.LOGOUT ? 'active' : ''}`}>
                <FontAwesomeIcon icon={'right-from-bracket'} onClick={e => selectActiveDashBoard(DASHBOARD.LOGOUT)} size='2x'> Exit </FontAwesomeIcon>
            </div>
        </div>
    )
}