import Card from "react-bootstrap/Card";

export const TopicCard = ({ topic, description }) => {
  return (
    <div className={"article-card"}>
      <Card style={{ width: "14rem" }}>
        <Card.Header>{topic}</Card.Header>
        <Card.Body>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
