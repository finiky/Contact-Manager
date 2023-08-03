import { useState } from "react";
import styles from "./Login.module.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className={styles.main}>
      <form className={styles.form}>
        <div className={styles.inputDiv}>
          <label htmlFor="email">Email Id</label>
          <input
            id="email"
            className={styles.input}
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputDiv}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className={styles.input}
            type="password"
            placeholder="Password"
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
    </div>
  );
};

export default Login;
