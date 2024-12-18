import {Link} from "react-router";

export const Footer = () => {
    return (
        <footer className={"footer"}>
           <Link className={"link"} to={"/about"}><p className={"footer-text"}>About</p></Link>
            <Link className={"link"} to={"/contact"}><p className={"footer-text"}>Contact</p></Link>
        </footer>
    );
}