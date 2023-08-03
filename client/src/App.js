import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Login from "./Login";

const App = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Contact Manager</h1>
      <Routes>
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
