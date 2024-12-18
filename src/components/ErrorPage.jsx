import errorImg from "../assets/errorImg.png"
import Button from "react-bootstrap/Button";
import {Link} from "react-router";

export const ErrorPage = () => {
  return <>
    <section className={"error-container"}>
        <img className={"error-img"} src={errorImg} alt={"Image for the error page - 404 Not found"}/>
        <p>Country roads ...</p>
        <Link className={"link"} to={"/"}>
        <Button variant={"warning"}>Take me home</Button>
        </Link>
    </section>
  </>;
};
