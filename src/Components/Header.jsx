import React from "react";
import '../Styles/Header.scss'

function Header({score}) {



    return (
        <div className="header">
            <div className="score-panel">
                <div className="label">High Score</div>
                <div className="score">0</div>
            </div>
            <div className="score-panel">
                <div className="label">Current Score</div>
                <div className="score">{score}</div>
            </div>
            <div className="settings">

            </div>
        </div>
    )
}

export default Header;