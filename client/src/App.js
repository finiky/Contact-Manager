import { Route, Routes } from "react-router-dom";
import styles from "./App.module.css";
import Login from "./Login";
import Contacts from "./Contacts";
import Contact from "./Contact";
import Register from "./Register";

const App = () => {
  return (
    <div className={styles.main}>
      <h1 className={styles.heading}>Contact Manager</h1>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/contacts" element={<Contacts />} />
        <Route exact path="/contacts/:contactid" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;
