import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../components/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DASHBOARD } from '../../helper/generalConstants';
import { toJson } from '../../helper/util';
import Friends from './friends/Friends';
import GamePlay from './game/GamePlay';
import Home from './home/Home';
import LeaderBoard from './leaderBoard/LeaderBoard';
import Login from '../Login/Mainpage'
import Settings from './settings/Settings';
import SideNav from './sideNav';
import './dashboard.css';

export default () => {
    const { logout, user, login } = useContext(UserContext);
    const [selectedBoard, setSelectedBoard] = useState('');

    useEffect(() => {
        if (!window.localStorage.getItem('token')) {
            logout();
        } else {
            login(toJson(window.localStorage.getItem('userData')))
        }
    }, [])

    const activeBoard = () => {
        switch (selectedBoard) {
            case DASHBOARD.LEADER_BORAD: {
                return <LeaderBoard />
            }
            case DASHBOARD.FRIENDS: {
                return <Friends />
            }
            case DASHBOARD.SETTINGS: {
                return <Settings />
            }
            case DASHBOARD.HOME: {
                return <Home />
            }
            case DASHBOARD.GAME_PLAY: {
                return <GamePlay />
            }
            case DASHBOARD.LOGOUT: {
                logout(true);
                return <Login />
            }
            default: {
                return <Home />
            }
        }
    }
    const onSelectDashBoard = (selectedDashBoard) => {
        setSelectedBoard(selectedDashBoard)
    }
    const userData = {
        name: 'Varshini',
        email: 'Email',
        number: 'Number'
    }
    return (
        <div className='container'>
            <div className='inner-container'>
                <div className='side-nav'>
                    <SideNav onSelectDashBoard={onSelectDashBoard} />
                </div>
                <div className='dashboard-body'>
                    <div className='top-banner'>
                        <div className='padding'>
                            <h1>Hi, {user?.userName}</h1>
                            Welcome back
                        </div>
                        <div className='dashboard-icons'>
                            <div className='padding'>
                                <FontAwesomeIcon icon={'magnifying-glass'} size='2x'></FontAwesomeIcon>
                            </div>
                            <div className='padding'>
                                <FontAwesomeIcon icon={'bell'} size='2x'></FontAwesomeIcon>
                            </div>
                            <div className='padding'>
                                <FontAwesomeIcon icon={'user'} size='2x'></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                    {activeBoard()}
                    {/* <div className='dashboard-image'>
                         <img src={DashboardImage} />
                    </div> */}
                </div>
            </div>
        </div>
    )
}