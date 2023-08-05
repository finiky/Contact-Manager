import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Login from "./Login";
import Register from "./Register";
import Contacts from "./Contacts";
import CreateContact from "./CreateContact";
import Contact from "./Contact";
import EditContact from "./EditContact";
import LoginButton from "./LoginButton";
import { useState } from "react";
const App = () => {
  const [loginStatus, setLoginStatus] = useState("");
  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <LoginButton loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
        <button>Register</button>
      </header>
      <h1 className={styles.heading}>Contact Manager</h1>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/contacts" element={<Contacts />} />
        <Route exact path="/contacts/:contactid" element={<Contact />} />
        <Route exact path="/create" element={<CreateContact />} />
        <Route exact path="/edit/:contactid" element={<EditContact />} />
      </Routes>
    </div>
  );
};

export default App;
