import Dropdown from "react-bootstrap/Dropdown";
import { ArticleCard } from "./ArticleCard.jsx";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { convertDate, reqUrl } from "../utils.js";
import { Loading } from "./Loading.jsx";
import { ErrorPage } from "./ErrorPage.jsx";
import { PageDisplay } from "./PageDisplay.jsx";

export const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const topicQuery = searchParams.get("topic");
  const sortBy = searchParams.get("sort_by") || "created_at";
  const order = searchParams.get("order") || "desc";
  const page = searchParams.get("p") || "1";
  const [activePage, setActivePage] = useState(Number(page));

  const setSortBy = (sortBy) => {
    const newSort = new URLSearchParams(searchParams);
    newSort.set("sort_by", sortBy);
    setSearchParams(newSort);
  };

  const setOrder = (order) => {
    const newOrder = new URLSearchParams(searchParams);
    newOrder.set("order", order);
    setSearchParams(newOrder);
  };

  const setPage = (page) => {
    const newPage = new URLSearchParams(searchParams);
    newPage.set("p", page);
    setSearchParams(newPage);
  };

  useEffect(() => {
    setError(null);

    const constructUrl = () => {
      const params = new URLSearchParams();
      if (topicQuery) params.append("topic", topicQuery);
      params.append("p", page);
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
  }, [topicQuery, sortBy, order, page]);

  return error ? (
    <ErrorPage />
  ) : (
    <section className={"all-articles"}>
      <header className={"all-articles-top"}>
        <h2>All articles </h2>
        <div className={"all-articles-dropdowns"}>
          <Dropdown>
            <Dropdown.Toggle variant="outline-danger" id="dropdown-basic">
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
            <Dropdown.Toggle variant="outline-danger" id="dropdown-basic">
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
      <section className={"pageDisplay"}>
        <PageDisplay
          pagesNum={4}
          setActivePage={setActivePage}
          activePage={activePage}
          setPage={setPage}
          scrollToCoordinates={0}
        />
      </section>
    </section>
  );
};
