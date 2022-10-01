import { useEffect, useState, useContext } from "react";
import { Form, useNavigate } from "react-router-dom";
import ItemDetails from "./ItemDetails";
import { Button } from "react-bootstrap";
// import "../App.css";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { InventoryContext } from "./InventoryContext";

const GuestLoginPage = () => {
  const { inventoryItems, setInventoryItems } = useContext(InventoryContext);
  //   const [inventoryItems, setInventoryItems] = useState([]);
  const [show, setShow] = useState(false);
  const [modifyItem, setModifyItem] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [singleUpdate, setSingleUpdate] = useState(false);
  const [updatedItem, setUpdatedItem] = useState({
    item_name: "",
    description: "",
    quantity: "",
  });

  const navigate = useNavigate();

  const saveUpdatedItem = () => {
    console.log(modifyItem);
    axios
      .patch(`http://localhost:8000/inventory/${modifyItem.id}`, modifyItem)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // handleClose();
    navigate(`/guest/${modifyItem.id}`);
    window.location.reload();
    //navigate(`/guest/${modifyItem.id}`);
    // onClick={() => navigate(`/guest/${item.id}`)}
    // window.location.reload();
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setModifyItem((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const updateItem = (item) => {
    setModifyItem(item);
    handleShow();
  };

  useEffect(() => {
    fetch("http://localhost:8000/inventory")
      .then((res) => res.json())
      .then((data) => setInventoryItems(data));
  }, []);

  const handleDeleteItem = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:8000/inventory/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    alert(`You have successfully deleted an inventory of ${id}`);

    window.location.reload();
  };

  return (
    <div>
      <div>Welcome Guest, take a look at our inventory</div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update An Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <form> */}

          <input
            style={{
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              width: "100%",
            }}
            placeholder="name"
            name="item_name"
            value={modifyItem.item_name ? modifyItem.item_name : ""}
            onChange={handleUpdateChange}
          ></input>
          <input
            style={{
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              width: "100%",
            }}
            placeholder="description"
            name="description"
            value={modifyItem.description ? modifyItem.description : ""}
            onChange={handleUpdateChange}
          ></input>
          <input
            style={{
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              width: "100%",
            }}
            placeholder="quantity"
            name="quantity"
            value={modifyItem.quantity ? modifyItem.quantity : ""}
            onChange={handleUpdateChange}
          ></input>
          {/* </form> */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveUpdatedItem}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div
        style={{
          margin: "12px 0px",
          boxShadow: "0px 0px 8px #ccc",
          borderRadius: "8px",
          color: "#253B56",
        }}
      >
        {inventoryItems.map((item, index) => (
          <div
            key={index}
            // style={{
            //   border: "solid lightgray 1px",
            //   borderRadius: "8px",
            //   marginBottom: "1rem",
            //   width: "50%",
            //   textAlign: "center",
            // }}
            // onClick={() => navigate(`/guest/${item.id}`)}
          >
            <div>
              <div variant="outlined">{item.item_name}</div>
              <h1>
                {item.description.length > 100
                  ? item.description.substring(0, 99) + "..."
                  : item.description}
              </h1>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              ></div>
              <Button
                onClick={() => updateItem(item)}
                variant="outline-info"
                style={{ width: "30%", marginRight: "1rem" }}
              >
                UPDATE
              </Button>
              <Button
                onClick={() => handleDeleteItem(item.id)}
                variant="outline-danger"
                style={{ width: "30%" }}
              >
                DELETE
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuestLoginPage;
