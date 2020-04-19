import React from 'react';
import './InfoBar.css';

import onlineIcon from '../Icons/fund.png';
import closeIcon from '../Icons/close.png';

const InfoBar = ({room}) => {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img className="onlineIcon" src={onlineIcon} alt="online"/>
                <h3>{room}</h3>
            </div>
            <div className="rightInnerContainer">
                <a href="/"><img src={closeIcon} alt="close"/></a>
            </div>
        </div>
    )
}

export default InfoBar;

