import { useEffect, useState, useContext } from "react";
import './dashboard.css';
import SideNav from "./sideNav";
import { UserContext } from "../components/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DASHBOARD } from '../../helper/generalConstants';
import LeaderBoard from './leaderBoard/leaderBoard';
export default () => {
    const { user } = useContext(UserContext);
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
    const userData = {
        name: 'Varshini',
        email: 'Email',
        number: 'Number'
    }
    return (
        <div className="container">
            <div className="inner-container">
                <div className="side-nav">
                    <SideNav onSelectDashBoard={onSelectDashBoard} />
                </div>
                <div className="dashboard-body">
                    <div className="top-banner">
                        <div className="padding">
                            <h1>Hi, {userData.name}</h1>
                            Welcome back
                        </div>
                        <div className="dashboard-icons">
                            <div className="padding">
                                <FontAwesomeIcon icon={"magnifying-glass"} size="2x"></FontAwesomeIcon>
                            </div>
                            <div className="padding">
                                <FontAwesomeIcon icon={"bell"} size="2x"></FontAwesomeIcon>
                            </div>
                            <div className="padding">
                                <FontAwesomeIcon icon={"user"} size="2x"></FontAwesomeIcon>
                            </div>
                        </div>
                    </div>
                    <div>
                        {activeBoard()}
                    </div>
                    {/* <div className="dashboard-image">
                         <img src={DashboardImage} />
                    </div> */}
                </div>
            </div>
        </div>
    )
}