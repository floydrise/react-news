import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Loading } from "./Loading.jsx";
import {reqUrl} from "../utils.js";

export const CommentForm = ({ article_id, setSubmitted, setCommentErr }) => {
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(false);

    if (input.trim() === "") {
      setCommentErr("Please, write in the comment field");
    } else {
      setIsSubmitting(true);
      setCommentErr(null);
      reqUrl
        .post(
          `/articles/${article_id}/comments`,
          {
            username: "tickle122",
            body: input.trim(),
          },
        )
        .then(() => {
          setSubmitted(true);
          setInput("");
        })
        .catch(() => setCommentErr("An error occurred, please try again later"))
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="comment-area">
        <Form.Label column={"lg"}>Add comment:</Form.Label>
        <Form.Control
          as="textarea"
          placeholder={"Enter comment"}
          rows={5}
          onChange={(e) => {
            setInput(e.target.value);
            setCommentErr(null);
          }}
          value={input}
        />
      </Form.Group>
      <Button variant="warning" type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loading /> : "Submit"}
      </Button>
    </Form>
  );
};
