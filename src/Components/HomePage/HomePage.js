import React, { useState } from "react" ;
import NavBar from "../NavBar/NavBar";
import MainContent from "../MainContent/MainContent";
import "./HomePage.css"

export default function HomePage() {


    const [count, setCount] = useState(0);

    return (
        <div id="HomePageContainer">
            <NavBar/>
            <MainContent/>
       </div>
    )
}