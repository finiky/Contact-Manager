import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Cookies from "universal-cookie";
import jwt from "jwt-decode";
const Login = ({ setLoginStatus }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.PORT}/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      const { accessToken } = await response.json();
      const decoded = jwt(accessToken);
      cookies.set("JWT-Authorization", accessToken, {
        expires: new Date(decoded.exp * 1000),
      });
      setLoginStatus("Logout");
      navigate("/contacts");
    } else {
      setEmail("");
      setPassword("");
      setLoginStatus("Login");
      navigate("/login");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputDiv}>
        <label className={styles.label} htmlFor="email">
          Email Id
        </label>
        <input
          id="email"
          className={styles.input}
          type="email"
          placeholder="type your email id"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          id="password"
          className={styles.input}
          type="password"
          placeholder="type your password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <button className={styles.button} type="submit">
        Sign In
      </button>
    </form>
  );
};

export default Login;
