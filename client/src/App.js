import React, { useState, useEffect } from "react";
import "./App.css";
import GuestLoginPage from "./components/GuestLoginPage";
import { BrowserRouter, Routes, Route } from "react-router";
import LoginPage from "./components/LoginPage";
import ModifyContent from "./components/ModifyContent";
import UserHomePage from "./components/UserHomePage";
import ItemDetails from "./components/ItemDetails";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import NavBar from "./components/NavBar";
import { useContext } from "react";
// import {LoginForm} from "./components/LoginForm";
import { InventoryContext } from "./components/InventoryContext";
// import { Container, AppBar, Typography, Grow, Grid } from "material-ui/core";

// export const UserContext = React.createContext();

function App() {
  // const passContext = { user, setUser, login, setLogin, item, setItem };

  const bootstrap = require("bootstrap");
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);
  const [item, setItem] = useState({});
  const [inventoryItems, setInventoryItems] = useState([]);

  return (
    <InventoryContext.Provider
      value={{
        item,
        setItem,
        login,
        setLogin,
        user,
        setUser,
        inventoryItems,
        setInventoryItems,
      }}
    >
      <div>
        <NavBar />
        <Routes>
          <Route path="/guest" element={<GuestLoginPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/modify" element={<ModifyContent />} />
          <Route path="/user-home" element={<UserHomePage />} />
          <Route path="/guest/:id" element={<ItemDetails />} />
          <Route path="/login-form" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/item-details" element={<ItemDetails />} />
        </Routes>
      </div>
    </InventoryContext.Provider>
  );
}

export default App;
