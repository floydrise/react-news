import Card from "react-bootstrap/Card";

export const ArticleCard = ({ title, imgUrl, author, createdAt, votes, comments }) => {
  return (
    <div className={"article-card"}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={imgUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            Author: {author} <br />
            Published: <em>{createdAt}</em> <br />
            Votes: {votes} <br />
            Comments: {comments}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
