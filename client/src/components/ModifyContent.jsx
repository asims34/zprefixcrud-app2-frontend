import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { hasUnreliableEmptyValue } from "@testing-library/user-event/dist/utils";

const ModifyContent = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    item_name: "",
    description: "",
    quantity: "",
    users_id: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //   useEffect(() => {
  //     console.log(post);
  //   }, [post]);

  const handleClick = (event) => {
    event.preventDefault();
    console.log(post);

    // fetch("http://localhost:8000/inventory/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(post),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Success:", data);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    axios
      .post("http://localhost:8000/inventory/", {
        // post,
        item_name: post.item_name,
        description: post.description,
        quantity: post.quantity,
        users_id: post.users_id,
      })
      .then((res) => res.json(res))
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((err) => console.log(err))
      .then(() => {
        navigate("/user-home");
        window.location.reload();
      });
  };

  return (
    <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
      <h1> Make Changes here</h1>
      <Form>
        <Form.Group>
          <Form.Control
            name="item_name"
            placeholder="name"
            value={post.item_name}
            type="text"
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />
          <Form.Control
            name="description"
            placeholder="description"
            type="text"
            value={post.description}
            style={{ marginBottom: "1rem" }}
            onChange={handleChange}
          />
          <Form.Control
            name="quantity"
            placeholder="quantity"
            value={post.quantity}
            type="number"
            onChange={handleChange}
            style={{ marginBottom: "1rem" }}
          />
        </Form.Group>
        <Button
          onClick={handleClick}
          style={{ width: "100%", marginBottom: "1rem" }}
          variant="outline-success"
        >
          Add
        </Button>
      </Form>

      <Button onClick={() => navigate(-1)}>REDIRECT</Button>
    </div>
  );
};

export default ModifyContent;
