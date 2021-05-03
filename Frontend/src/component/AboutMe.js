import React from 'react'
import './AboutMe.css'
export default function AboutMe() {
    return (
        <div className="flexbox">
            <div className="profile">
                <img src='./patipanpic.PNG' alt="" className="pic-profile" />
                <p className="name">Name: Mr.Patipan Roungsuwan</p>
                <p className="id">ID: 60010565</p>
                <p className="department">Department: Information Engineering, KMTIL</p>
            </div>
            <div className="profile">
                <img src='./papawinpic.PNG' alt="" className="pic-profile" />
                <p className="name">Name: Mr.Papawin Srimuang</p>
                <p className="id">ID: 60010576</p>
                <p className="department">Department: Information Engineering, KMTIL</p>
            </div>
        </div>
    )
}
