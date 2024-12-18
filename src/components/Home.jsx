import { Link } from "react-router";
import { useEffect, useState } from "react";
import { convertDate, reqUrl } from "../utils.js";
import { TopicCard } from "./TopicCard.jsx";
import { ArticleCard } from "./ArticleCard.jsx";
import Button from "react-bootstrap/Button";
import { Loading } from "./Loading.jsx";
import topicsImg from "../assets/topicsImg.jpg"

export const Home = () => {
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const [articlesLoading, setArticlesLoading] = useState(true);

  useEffect(() => {
    setTopicsLoading(true);
    reqUrl.get("/topics").then(({ data: { topics } }) => {
      setTopics(topics);
      setTopicsLoading(false);
    });
  }, []);

  useEffect(() => {
    setArticlesLoading(true);
    reqUrl.get("/articles?p=7&limit=4").then(({ data: { articles } }) => {
      setArticles(articles);
      setArticlesLoading(false);
    });
  }, []);

  return (
    <>
      <section className={"homepage"}>
        <h2>Topics: </h2>
        <nav className={"topic-cards"}>
          {topicsLoading ? (
            <Loading />
          ) : (
            topics.map((topic) => {
              return (
                <Link
                  className={"link"}
                  key={topic.slug}
                  to={`/articles?topic=${topic.slug}`}
                >
                  <TopicCard
                    topic={topic.slug}
                    description={topic.description}
                    img={topicsImg}
                  />
                </Link>
              );
            })
          )}
        </nav>
      </section>
      <section className={"homepage"}>
        <h2>Articles: </h2>
        <nav className={"articles"}>
          {articlesLoading ? (
            <Loading />
          ) : (
            articles.map((article) => {
              return (
                <Link
                  key={article.article_id}
                  className={"link"}
                  to={`/articles/${article.article_id}`}
                >
                  <ArticleCard
                    title={article.title}
                    imgUrl={article.article_img_url}
                    author={article.author}
                    createdAt={convertDate(article.created_at)}
                    votes={article.votes}
                    comments={article.comment_count}
                  />
                </Link>
              );
            })
          )}
          <Link to={"/articles"}>
            <Button variant={"warning"}>More articles</Button>
          </Link>
        </nav>
      </section>
    </>
  );
};
