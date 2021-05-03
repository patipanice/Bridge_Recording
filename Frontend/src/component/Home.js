import React from 'react'
import './Home.css'
import Typing from './ReactTypingEffects'
export default function Home() {

    return (
        <div className="flex">
            {/*<img src="./icon.png" alt="icon" className="home-icon" /> */}
            <div className="flex-img">
                <img src="./images/IconH.png" alt="icon" className="img-icon" />
                <img src="./images/IconS.png" alt="icon" className="img-icon" />
                <img src="./images/IconD.png" alt="icon" className="img-iconD" />
                <img src="./images/IconC.png" alt="icon" className="img-icon" />
            </div>
            <h1>CONTRACT BRIDGE PLAYING</h1>
            <Typing />
        </div>
    )
}
