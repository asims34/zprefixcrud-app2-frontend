import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./LoginForm";
import { InventoryContext } from "./InventoryContext";

const UserHomePage = () => {
  const [userItems, setUserItems] = useState([]);
  const [currentInventory, setCurrentInventory] = useState([]);

  const { item, setItem, inventoryItems, setInventoryItems } =
    useContext(InventoryContext);

  //   useEffect(() => {
  //     axios
  //       .get("/inventory")
  //       .then((response) =>
  //         console.log(response).catch((error) => console.log(error))
  //       );
  //   });

  //   useEffect(() => {
  //     const user = LoginForm.getCurrentUser();
  //     if (user) {
  //       setCurrentUser(user);
  //     }
  //   }, []);

  useEffect(() => {
    fetch("http://localhost:8000/inventory/")
      .then((response) => response.json())
      .then((data) => setCurrentInventory(data));
  }, []);
  //   console.log(currentUser);
  const navigate = useNavigate();
  return (
    <div style={{ width: "90%", margin: "auto auto", textAlign: "center" }}>
      <h1>Welcome to your inventory Page </h1> <h1>{item.first_name}</h1>
      {/* {currentInventory.map((product) => console.log("my map", product))} */}
      <h1>{item.id}</h1>
      <h2>{item.username}</h2>
      {currentInventory.map((products, index) => {
        if (products.users_id === item.id) {
          return <h1 key={index}>{products.item_name}</h1>;
        }
      })}
      <Button onClick={() => navigate("/modify")}>Modify</Button>
      <Button onClick={() => navigate("/guest")}>All Items</Button>
    </div>
  );
};

export default UserHomePage;
