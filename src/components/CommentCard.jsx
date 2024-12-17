export const CommentCard = ({ author, body, createdAt }) => {
  return (
      <div className={"comment-card"}>
          <div className={"test"}>
              <span><strong>{author}</strong></span>
              <span><em>{createdAt}</em></span>
          </div>
          <p>{body}</p>
      </div>
  );
};
