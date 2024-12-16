import Dropdown from "react-bootstrap/Dropdown";
import { ArticleCard } from "./ArticleCard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

export const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://news-api-40x5.onrender.com/api/articles")
      .then(({ data: { articles } }) => {
        setArticles(articles);
        setisLoading(false);
      });
  }, []);

  return (
    <div className={"all-articles"}>
      <div className={"all-articles-top"}>
        <h2>All articles </h2>
        <Dropdown>
          <Dropdown.Toggle variant="danger" id="dropdown-basic">
            Sort by
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="">Topic</Dropdown.Item>
            <Dropdown.Item href="">Votes</Dropdown.Item>
            <Dropdown.Item href="">Date</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className={"articles"}>
        {isLoading ? (
          <p>Loading ... </p>
        ) : (
          articles.map((article) => {
            return (
              <ArticleCard
                key={article.id}
                title={article.title}
                imgUrl={article.article_img_url}
                author={article.author}
                createdAt={article.created_at}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
