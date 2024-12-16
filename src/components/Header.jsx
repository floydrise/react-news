import logo from "../assets/news-logo.jpg"
import {useEffect, useState} from "react";
import axios from "axios";


export const Header = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios.get("https://news-api-40x5.onrender.com/api/users/tickle122").then(r => {
            setUser(r.data.user);
        })
    }, []);

    return (
        <header className="header">
            <div className={"header-left"}>
                <img className={"logo"} src={logo} alt={"logo of the website"}/>
            </div>
            <div className={"header-right"}>
                <img className={"user-img"} src={user.avatar_url} alt={"Avatar of the logged in user"}/>
            </div>
        </header>
    )
}