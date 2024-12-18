import Card from "react-bootstrap/Card";

export const TopicCard = ({ topic, description, img }) => {
  return (
    <div className={"article-card"}>
      <Card style={{ width: "14rem" }}>
        <Card.Img variant="top" src={img} />
        <Card.Header>{topic}</Card.Header>
        <Card.Body>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
