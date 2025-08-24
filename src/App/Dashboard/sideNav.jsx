import { useEffect, useState } from "react";
import './dashboard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default () => {
    return (
        <div className="icons">
            <div className="icons-align">
                <FontAwesomeIcon icon={"home"} size="2x"> Home </FontAwesomeIcon>
            </div>
            <div className="icons-align">
                <FontAwesomeIcon icon={"gamepad"} size="2x"> Game </FontAwesomeIcon>
            </div>
            <div className="icons-align">
                <FontAwesomeIcon icon={"trophy"} size="2x"> Trophy </FontAwesomeIcon>
            </div>
            <div className="icons-align">
                <FontAwesomeIcon icon={"user-group"} size="2x"> Friends </FontAwesomeIcon>
            </div>
            <div className="icons-align">
                <FontAwesomeIcon icon={"gear"} size="2x"> Gear </FontAwesomeIcon>
            </div>
            <div className="icons-align">
                <FontAwesomeIcon icon={"right-from-bracket"} size="2x"> Exit </FontAwesomeIcon>
            </div>
        </div>
    )
}