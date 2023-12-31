import { Route, Routes, Link } from "react-router-dom";
import styles from "./App.module.css";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Contacts from "./Contacts";
import CreateContact from "./CreateContact";
import Contact from "./Contact";
import EditContact from "./EditContact";
import LoginButton from "./LoginButton";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
const App = () => {
  const [loginStatus, setLoginStatus] = useState("Login");
  useEffect(() => {
    const cookies = new Cookies();
    const accessToken = cookies.get("JWT-Authorization");
    if (accessToken) {
      setLoginStatus("Logout");
    } else {
      setLoginStatus("Login");
    }
  }, []);
  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Contact Manager</h1>
      <header className={styles.header}>
        <LoginButton
          className={styles.button}
          loginStatus={loginStatus}
          setLoginStatus={setLoginStatus}
        />
        <button className={styles.button}>
          <Link className={styles.link} to="/register">
            Register
          </Link>
        </button>
        <button className={styles.button}>
          <Link className={styles.link} to="/">
            Home
          </Link>
        </button>
        <button className={styles.button}>
          <Link className={styles.link} to="/contacts">
            My Contacts
          </Link>
        </button>
        <button className={`${styles.button} ${styles.grid}`}>
          <Link className={styles.link} to="/create">
            Create Contact
          </Link>
        </button>
      </header>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/create" element={<CreateContact />} />
        <Route exact path="/contacts" element={<Contacts />} />
        <Route exact path="/contacts/:contactid" element={<Contact />} />
        <Route exact path="/create" element={<CreateContact />} />
        <Route exact path="/edit/:contactid" element={<EditContact />} />
        <Route
          exact
          path="/login"
          element={<Login setLoginStatus={setLoginStatus} />}
        />
      </Routes>
    </div>
  );
};

export default App;
