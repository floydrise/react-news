import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { convertDate } from "../utils.js";
import { Loading } from "./Loading.jsx";

export const Article = () => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [article, setArticle] = useState({});
  useEffect(() => {
    axios
      .get(`https://news-api-40x5.onrender.com/api/articles/${article_id}`)
      .then(({ data: { article } }) => {
        setArticle(article);
        setIsLoading(false);
      });
  }, [article_id]);

  const date = convertDate(article.created_at);

  return (
    <>
      <article className={"article-container"}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <section className={"article-main"}>
              <header>
                <h3>{article.title}</h3>
                <div className={"article-header"}>
                  <p>Published: <em>{date}</em></p>
                  <p>Author: {article.author}</p>
                  <p>Topic: {article.topic}</p>
                </div>
              </header>
              <p>{article.body}</p>
            </section>
          </>
        )}
      </article>
    </>
  );
};
