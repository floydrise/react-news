import githubIcon from "../assets/githubIcon.png";
import linkedinIcon from "../assets/linkedinIcon.png";
import mailIcon from "../assets/mailIcon.png";

export const Contact = () => {
  return (
    <>
      <section className={"about-container"}>
        <h1 style={{ marginTop: "0.5em" }}>Contact</h1>
        <p>You can contact me on:</p>
        <div className={"contacts-container"}>
          <a href={"https://github.com/floydrise"} target={"_blank"}>
            <img
              src={githubIcon}
              className={"media-icon"}
              alt={"GitHub icon"}
            />
          </a>
          <a
            href={"https://www.linkedin.com/in/stefan-petrov-6404401bb/"}
            target={"_blank"}
          >
            <img
              src={linkedinIcon}
              className={"media-icon"}
              alt={"linked in icon"}
            />
          </a>
          <a href={"mailto:floydrise@gmail.com"}>
            <img src={mailIcon} alt={"Email icon"} className={"media-icon"} />
          </a>
        </div>
      </section>
    </>
  );
};
