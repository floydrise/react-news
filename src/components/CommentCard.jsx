import axios from "axios";
import { useState } from "react";
import { Loading } from "./Loading.jsx";

export const CommentCard = ({
  author,
  body,
  createdAt,
  comment_id,
  setComments,
}) => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleCommentDelete = () => {
    setLoadingDelete(true);
    axios
      .delete(`https://news-api-40x5.onrender.com/api/comments/${comment_id}`)
      .then(() => {
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.comment_id !== comment_id),
        );
        setLoadingDelete(false);
      })
  };

  return (
    <div className={"comment-card"}>
      <div className={"test"}>
        <span>
          <strong>{author}</strong>
        </span>
        <span>
          <em>{createdAt}</em>
        </span>
        {author === "tickle122" ? (
          loadingDelete ? (
            <Loading />
          ) : (
            <span className={"comment-delete"} onClick={handleCommentDelete}>
              ❌
            </span>
          )
        ) : null}
      </div>
      <p>{body}</p>
    </div>
  );
};
