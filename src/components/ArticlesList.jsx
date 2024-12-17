import Dropdown from "react-bootstrap/Dropdown";
import { ArticleCard } from "./ArticleCard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import {convertDate, reqUrl} from "../utils.js";
import { Loading } from "./Loading.jsx";

export const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    reqUrl.get("/articles?p=4").then(({ data: { articles } }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);

  return (
    <section className={"all-articles"}>
      <header className={"all-articles-top"}>
        <h2>All articles </h2>
        <Dropdown>
          <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
            Sort by
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="">Topic</Dropdown.Item>
            <Dropdown.Item href="">Votes</Dropdown.Item>
            <Dropdown.Item href="">Date</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </header>
      <section className={"articles"}>
        {isLoading ? (
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
                />
              </Link>
            );
          })
        )}
      </section>
    </section>
  );
};
