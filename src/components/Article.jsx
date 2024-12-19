import { useParams, useSearchParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { convertDate, reqUrl } from "../utils.js";
import { Loading } from "./Loading.jsx";
import { CommentCard } from "./CommentCard.jsx";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { CommentForm } from "./CommentForm.jsx";
import { ErrorPage } from "./ErrorPage.jsx";
import { PageDisplay } from "./PageDisplay.jsx";

export const Article = () => {
  const { article_id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [article, setArticle] = useState({});
  const [areHidden, setAreHidden] = useState(false);
  const [votes, setVotes] = useState(0);
  const [error, setError] = useState(null);
  const [commentErr, setCommentErr] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("p") || "1";
  const [activePage, setActivePage] = useState(Number(page));

  const setPage = (page) => {
    const newPage = new URLSearchParams(searchParams);
    newPage.set("p", page);
    setSearchParams(newPage);
  };

  const handleHiding = () => {
    setAreHidden(!areHidden);
  };

  const handleUpvote = () => {
    setVotes((prevVotes) => prevVotes + 1);
    setError(null);
    reqUrl
      .patch(`/articles/${article_id}`, {
        inc_votes: 1,
      })
      .catch(() => {
        setVotes((prevVotes) => prevVotes - 1);
        setError("Action was not successful, please try again.");
      });
  };
  const handleDownvote = () => {
    setVotes((prevVotes) => prevVotes - 1);
    setError(null);
    reqUrl
      .patch(`/articles/${article_id}`, {
        inc_votes: -1,
      })
      .catch(() => {
        setVotes((prevVotes) => prevVotes + 1);
        setError("Action was not successful, please try again.");
      });
  };

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    reqUrl
      .get(`/articles/${article_id}`)
      .then(({ data: { article } }) => {
        setArticle(article);
        setIsLoading(false);
        setVotes(article.votes);
        setDate(convertDate(article.created_at));
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [article_id]);

  useEffect(() => {
    reqUrl
      .get(`/articles/${article_id}/comments?p=${page}`)
      .then(({ data: { comments } }) => {
        setComments(comments);
      });
  }, [article_id, page, submitted]);

  return (
    <>
      <article className={"article-container"}>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <ErrorPage />
        ) : (
          <>
            <section className={"article-main"}>
              <header className={"article-header"}>
                <img
                  className={"article-image"}
                  src={article.article_img_url}
                  alt={"Image representing the article"}
                />
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
            <section className={"voting-system"}>
              {error ? <p className={"voting-error"}>❌ {error}</p> : null}
              <ButtonGroup aria-label="Basic example">
                <Button variant="outline-success" onClick={handleUpvote}>
                  👍 {votes}
                </Button>
                <Button variant="outline-danger" onClick={handleDownvote}>
                  👎
                </Button>
              </ButtonGroup>
            </section>
            <section className={"comment-form"}>
              {commentErr ? (
                <p className={"comment-err"}>❌ {commentErr}</p>
              ) : null}
              <CommentForm
                article_id={article_id}
                setSubmitted={setSubmitted}
                setCommentErr={setCommentErr}
              />
            </section>
            <section className={"comment-section"}>
              <h4>Comments:</h4>
              <p className={"hide-comments"} onClick={handleHiding}>
                {areHidden ? "Show comments" : "Hide comments"}
              </p>
              {areHidden ? null : comments.length < 1 ? (
                <p>No comments yet, add one?</p>
              ) : (
                <>
                  {comments.map((comment) => {
                    return (
                      <CommentCard
                        key={comment.comment_id}
                        comment_id={comment.comment_id}
                        author={comment.author}
                        createdAt={convertDate(comment.created_at)}
                        body={comment.body}
                        setComments={setComments}
                      />
                    );
                  })}
                  <PageDisplay
                    pagesNum={Math.ceil(article.comment_count / 10)}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    setPage={setPage}
                  />
                </>
              )}
            </section>
          </>
        )}
      </article>
    </>
  );
};
