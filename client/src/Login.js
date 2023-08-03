import { useState } from "react";
import styles from "./Login.module.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={styles.main}>
      Sign In
      <label htmlFor="email">
        Email Id:{" "}
        <input
          id="email"
          className={styles.input}
          placeholder="Email Id"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>
      <label>
        Password:{" "}
        <input
          id="password"
          className={styles.input}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </label>
    </div>
  );
};

export default Login;
