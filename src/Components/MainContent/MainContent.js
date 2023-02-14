import React, { useState } from "react" ;
import StatusBar from "../StatusBar/StatusBar";
import "./MainContent.css"
import Feed from "../Feed/Feed";
import Suggestion from "../Suggestion/Suggestion"

export default function MainContent() {


    return (
        <div id="MainContainer">
            <div id="Content">
                <StatusBar/>
                <Feed/>
            </div>
            <div id="Suggestion">
                <Suggestion/>
            </div>
        </div>
    );
}