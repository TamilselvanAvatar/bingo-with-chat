import { useEffect, useState } from "react";
import './dashboard.css';
import SideNav from "./sideNav";

export default () => {
    return (
        <div className="container">
            <div className="inner-container">
                <div className="side-nav">
                    <SideNav />
                </div>
                <div className="dashboard-body">
                    Hi Tamil
                </div>
            </div>
        </div>
    )
}