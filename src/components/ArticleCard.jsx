import Card from "react-bootstrap/Card";

export const ArticleCard = ({
  title,
  imgUrl,
  author,
  createdAt,
  votes,
  comments,
}) => {
  return (
    <div className={"article-card"}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={imgUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <span className={"article-card-text"}>
              <span>✍️: {author}</span>
              <span>
                🗓️: <em>{createdAt}</em>
              </span>
              <span className={"article-card-votes-comments"}>
                <span>👍👎: {votes}</span>
                <span>💬: {comments}</span>
              </span>
            </span>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
