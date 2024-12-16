import logo from "../assets/news-logo.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import { Loading } from "./Loading.jsx";

export const Header = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://news-api-40x5.onrender.com/api/users/tickle122")
      .then((r) => {
        setUser(r.data.user);
        setIsLoading(false);
      });
  }, []);

  return (
    <header className="header">
      <div className={"header-left"}>
        <Link to={"/"}>
          <img className={"logo"} src={logo} alt={"logo of the website"} />
        </Link>
      </div>
      <div className={"header-right"}>
        {isLoading ? (
          <Loading />
        ) : (
          <img
            className={"user-img"}
            src={user.avatar_url}
            alt={"Avatar of the logged in user"}
          />
        )}
      </div>
    </header>
  );
};
