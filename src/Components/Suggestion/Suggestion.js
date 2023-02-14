import React, { useState } from "react" ;
import "./Suggestion.css"
import api from "../../api.json"

export default function Suggestion() {


    const [count, setCount] = useState(0);

    return (
        <div id="SuggestionContainer">
            <div className="item-container">
                <img className="foto-profile" src={api.account.profile_picture} />
                <div className="icon-text">{api.account.username}</div>
                <div className="switch-button" >Switch</div>
            </div>
            <div className="container-text-Suggestion">
                <b className="text-Suggestion">Suggestions for you</b> 
                <b className="text-seeAll">See All</b>
            </div>
            
            {api.suggestion.data.map((follow,index) => {
                return(
                    <div key={index} className="suggestion-container">
                        <img className="suggestion-foto-profile" src={follow.profile_picture} />
                        <div className="suggestion-package">
                            <div className="suggestion-icon-text">{follow.username}</div>
                            <span className="followed-by-others">Followed by 4 others</span>
                        </div>
                        <div className="follow-button" >Follow</div>
                    </div>
                )
            })}
            <span className="text-about">About ·  Help ·  Press ·  API ·  Jobs ·  Privacy · Terms  ·  Locations · Language</span>
            <span className="text-about">© 2023 INSTAGRAM FROM META</span>
       </div>
    )
}