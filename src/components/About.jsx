export const About = () => {
  return (
    <>
      <section className={"about-container"}>
        <h1 style={{ marginTop: "0.5em" }}>General information</h1>
        <div className={"info-container"}>
          <p>
            This is a project imitating a real world news site. On the homepage
            you can see currently existing topics, a limited amount of articles
            and a navigation button to take you to a page with all the articles.
            Articles can be read, voted and commented on. The list of articles
            on the &#39;All articles&#39; page can be sorted and/or ordered. The
            user you&#39;re logged in as is currently hardcoded, authentication
            will be implemented in the future.
          </p>
          <span>
            <strong>
              <p>Technologies used:</p>
            </strong>
            <p>Front end</p>
            <ul>
              <li>Node.js</li>
              <li>React</li>
              <li>Vite</li>
              <li>React Router</li>
              <li>Axios</li>
              <li>Bootstrap React</li>
            </ul>
            <p>Back end</p>
            <ul>
              <li>Node.js</li>
              <li>Express</li>
              <li>Postgres</li>
              <li>Testing: Jest</li>
            </ul>
          </span>
          <p>
            GitHub repo:{" "}
            <a
              href={"https://github.com/floydrise/react-news"}
              target={"_blank"}
            >
              redirect to GitHub
            </a>
          </p>
        </div>
      </section>
    </>
  );
};
