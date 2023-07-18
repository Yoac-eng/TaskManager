import "./SearchNav.css";
import logo from "../pics/profile.png";
import { useState } from "react";

export default function SearchNav(){
    const [searchString, setSearchString] = useState('');

    return (
        <nav className="search_nav">
            <i className="fa-solid fa-bars-staggered" onClick={()=>document.querySelector("#small_screen").style.display = "block"}></i> 
            
            <div id="search_input_container">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="search" placeholder="Search" value={searchString} onChange={e => setSearchString(e.target.value)} id="search_input"/>
            </div>
            <div id="profile_container">
            <i className="fa-solid fa-clock-rotate-left"></i>
            
            <div id="profileImg">
                <img src={logo} id="logo"/>
            </div>
            </div>
        </nav>
    )
}