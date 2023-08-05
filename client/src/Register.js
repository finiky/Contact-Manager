import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5002/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    if (response.ok) {
      setError(false);
      navigate("/login");
    } else {
      setError(true);
    }
  };
  if (error) {
    return (
      <div>
        <p>Error Registering</p>
        <button
          onClick={() => {
            window.location.reload(false);
          }}
        >
          Retry Registering
        </button>
      </div>
    );
  }
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputDiv}>
        <label className={styles.label} htmlFor="username">
          Username
        </label>
        <input
          className={styles.input}
          id="username"
          type="text"
          placeholder="type your username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.label} htmlFor="email">
          Email
        </label>
        <input
          className={styles.input}
          id="email"
          type="email"
          placeholder="type your email id"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.input}
          id="password"
          type="password"
          placeholder="type your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className={styles.button} type="submit">
        Register
      </button>
    </form>
  );
};

export default Register;
