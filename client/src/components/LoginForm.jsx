import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { InventoryContext } from "./InventoryContext";
import App from "../App";

// const passContext = createContext({
//     data: null,
//     setData: (value) =>)

// })

const LoginForm = () => {
  const navigate = useNavigate();
  //   const { item, setItem } = useContext(InventoryContext);

  //   const [user, setUser] = useState({});
  //   const [login, setLogin] = useState(false);
  //   const [item, setItem] = useState("");
  //   const [test, setTest] = useState({});

  const { user, setUser, login, setLogin, item, setItem } =
    useContext(InventoryContext);

  const handleLoginClick = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/users/login", {
        // post,
        username: event.target.username.value,
        password: event.target.password.value,
      })

      //   .then((response) => response.json())
      //   .then((data) => console.log(data));
      // console
      //   .log(test)
      .then((response) => {
        console.log(response);
        if (response.data) {
          setItem(response.data);
        }
        console.log("res data1", response.data);
        console.log("item", item);
        return response.data;
      })
      // console
      //   .log("item", item)
      // console
      //   .log("res data2", setTest)
      //   })
      //   .then((res) => {
      //     if (!res.data.auth) {
      //       setLogin(false);
      //     } else {
      //       console.log(res.data);
      //       localStorage.setItem("token", res.data.token);
      //       setLogin(true);
      //     }
      //   })
      .then(() => {
        navigate("/user-home");
        // window.location.reload();
      })

      .catch((err) => console.log(err));
  };

  const getCurrentUser = () => {
    return JSON.parse(localStorage.item("user"));
  };

  //   const userAuthenticated = () => {
  //     axios
  //       .get("http://localhost:8000/users/isUserAuth", {
  //         headers: {
  //           "x-access-token": localStorage.getItem("token"),
  //         },
  //       })
  //       .then((response) => {
  //         console.log(response);
  //       });
  //}

  return (
    <div>
      <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
        <h1> Please Log In</h1>
        <Form onSubmit={handleLoginClick}>
          <Form.Group>
            <Form.Control
              name="username"
              placeholder="Username"
              // value={post.name}
              type="text"
              style={{ marginBottom: "1rem" }}
              // onChange={handleChange}
            />
            <Form.Control
              name="password"
              placeholder="Password"
              type="text"
              // value={post.description}
              style={{ marginBottom: "1rem" }}
              //   onChange={handleLoginClick}
            />
          </Form.Group>
          <Button
            type="submit"
            //onClick={() => navigate("/user-home")}
            // onClick={handleLoginClick}
            style={{ width: "100%", marginBottom: "1rem" }}
            variant="outline-success"
          >
            Login
          </Button>
        </Form>
        <NavBar />
      </div>
      {/* {login && (
        <button onClick={userAuthenticated}>Check if Authenticated</button>
      )} */}
    </div>
  );
};

export default LoginForm;
