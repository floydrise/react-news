import Dropdown from "react-bootstrap/Dropdown";
import { ArticleCard } from "./ArticleCard.jsx";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { convertDate, reqUrl } from "../utils.js";
import { Loading } from "./Loading.jsx";
import { ErrorPage } from "./ErrorPage.jsx";

export const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const topicQuery = searchParams.get("topic");
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";
  const [error, setError] = useState(null);

  const setSortBy = (sortBy) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", sortBy);
    setSearchParams(newParams);
  };

  const setOrder = (order) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("order", order);
    setSearchParams(newParams);
  };

  useEffect(() => {
    setError(null);

    const constructUrl = () => {
      const params = new URLSearchParams();
      if (topicQuery) params.append("topic", topicQuery);
      params.append("sort_by", sortBy);
      params.append("order", order);
      return `/articles?${params.toString()}`;
    };

    reqUrl
      .get(constructUrl())
      .then(({ data: { articles } }) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [topicQuery, sortBy, order]);

  return error ? (
    <ErrorPage />
  ) : (
    <section className={"all-articles"}>
      <header className={"all-articles-top"}>
        <h2>All articles </h2>
        <div className={"all-articles-dropdowns"}>
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
              Sort by:{" "}
              {sortBy === "created_at"
                ? "date"
                : sortBy === "comment_count"
                  ? "comment count"
                  : sortBy}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setSortBy("created_at");
                }}
              >
                Date
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSortBy("votes");
                }}
              >
                Votes
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setSortBy("comment_count");
                }}
              >
                Comment count
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
              Order: {order}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setOrder("asc");
                }}
              >
                Ascending
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setOrder("desc");
                }}
              >
                Descending
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
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
                  votes={article.votes}
                  comments={article.comment_count}
                />
              </Link>
            );
          })
        )}
      </section>
    </section>
  );
};
