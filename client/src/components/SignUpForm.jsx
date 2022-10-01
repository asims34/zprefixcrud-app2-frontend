import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { hasUnreliableEmptyValue } from "@testing-library/user-event/dist/utils";

const SignUpForm = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password_digest: "",
  });

  const handleSignInChange = (event) => {
    const { name, value } = event.target;

    setLogin((prev) => {
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
    console.log(login);

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
      .post("http://localhost:8000/users/signup", {
        // post,
        first_name: login.first_name,
        last_name: login.last_name,
        username: login.username,
        password_digest: login.password_digest,
      })
      .then((res) => res.json(res))
      .then((data) => {
        console.log("Success:", data);
      })

      .catch((err) => console.log(err))
      .then(() => {
        navigate("/");
        window.location.reload();
      });
  };

  return (
    <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
      <h1> Sign Up</h1>
      <Form>
        <Form.Group>
          <Form.Control
            name="first_name"
            placeholder="first name"
            value={login.first_name}
            type="text"
            style={{ marginBottom: "1rem" }}
            onChange={handleSignInChange}
          />
          <Form.Control
            name="last_name"
            placeholder="last name"
            type="text"
            value={login.last_name}
            style={{ marginBottom: "1rem" }}
            onChange={handleSignInChange}
          />
          <Form.Control
            name="username"
            placeholder="username"
            value={login.username}
            type="text"
            onChange={handleSignInChange}
            style={{ marginBottom: "1rem" }}
          />
          <Form.Control
            name="password_digest"
            placeholder="password"
            value={login.password_digest}
            type="number"
            onChange={handleSignInChange}
            style={{ marginBottom: "1rem" }}
          />
        </Form.Group>
        <Button
          onClick={handleClick}
          style={{ width: "100%", marginBottom: "1rem" }}
          variant="outline-success"
        >
          Sign-Up
        </Button>
      </Form>

      <Button onClick={() => navigate(-1)}>REDIRECT</Button>
    </div>
  );
};

export default SignUpForm;
