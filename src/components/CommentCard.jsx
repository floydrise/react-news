import { useState } from "react";
import { Loading } from "./Loading.jsx";
import {reqUrl} from "../utils.js";

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
    reqUrl
      .delete(`/comments/${comment_id}`)
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
              🗑️
            </span>
          )
        ) : null}
      </div>
      <p>{body}</p>
    </div>
  );
};
