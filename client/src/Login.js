import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const navigate = useNavigate();
  const handleSubmit = async () => {
    const response = await fetch("http://localhost:5002/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 200) {
      console.log("Login Success");
    } else {
      console.log("Login Unsuccessful");
    }
  };
  return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={() => handleSubmit()}>
        <div className={styles.inputDiv}>
          <label htmlFor="email">Email Id</label>
          <input
            id="email"
            className={styles.input}
            type="email"
            placeholder="email id"
            required
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
            placeholder="password"
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
    </div>
  );
};

export default Login;
