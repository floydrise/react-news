import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { convertDate } from "../utils.js";
import { Loading } from "./Loading.jsx";
import { CommentCard } from "./CommentCard.jsx";

export const Article = () => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState({});
  useEffect(() => {
    axios
      .get(`https://news-api-40x5.onrender.com/api/articles/${article_id}`)
      .then(({ data: { article } }) => {
        setArticle(article);
        setIsLoading(false);
      });
  }, [article_id]);

  useEffect(() => {
    axios
      .get(
        `https://news-api-40x5.onrender.com/api/articles/${article_id}/comments`,
      )
      .then(({ data: { comments } }) => {
        setComments(comments);
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
              <header className={"article-header"}>
                <img className={"article-image"} src={article.article_img_url} alt={"Image representing the article"}/>
                <h3>{article.title}</h3>
                <div className={"article-paras"}>
                  <p>
                    Published: <em>{date}</em>
                  </p>
                  <p>Author: {article.author}</p>
                  <p>Topic: {article.topic}</p>
                </div>
              </header>
              <p className={"article-body"}>{article.body}</p>
            </section>
            <section className={"comment-section"}>
              <h4>Comments:</h4>
              {comments.map((comment) => {
                return (
                  <CommentCard
                    key={comment.comment_id}
                    author={comment.author}
                    createdAt={convertDate(comment.created_at)}
                    body={comment.body}
                  />
                );
              })}
            </section>
          </>
        )}
      </article>
    </>
  );
};
