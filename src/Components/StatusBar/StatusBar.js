import React, { useState } from "react" ;
import "./StatusBar.css"
import api from "../../api.json"

export default function StatusBar() {


    const [count, setCount] = useState(0);

    return (
        <div id="StatusBar">
            {api.record.data.map(post => {
                return (
                    <div key={post.id} className="status">
                        <img className="statusbar-status" src={post.user.profile_picture} />
                        <div className="statusbar-text">{post.user.username}</div>
                    </div>
                )
            })}
            

       </div>
    )
}