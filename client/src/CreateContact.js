import Cookies from "universal-cookie";
import styles from "./CreateContact.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
const CreateContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleCreate = async (e) => {
    e.preventDefault();
    const cookies = new Cookies();
    const accessToken = cookies.get("JWT-Authorization");
    const response = await fetch("http://localhost:5002/api/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ name, email, phone }),
    });
    if (response.ok) {
      setError(false);
      navigate("/contacts");
    } else {
      setError(true);
    }
  };
  if (error) {
    return (
      <div>
        <p>Error creating a contact</p>
        <Link to="/contacts">My Contacts</Link>
      </div>
    );
  }
  return (
    <form className={styles.form} onSubmit={handleCreate}>
      <div className={styles.inputDiv}>
        <label className={styles.label} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          className={styles.input}
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.label} htmlFor="email">
          Email Id
        </label>
        <input
          className={styles.input}
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.inputDiv}>
        <label className={styles.label} htmlFor="phone">
          Phone
        </label>
        <input
          id="phone"
          className={styles.input}
          type="text"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <button className={styles.but} type="submit">
        Create
      </button>
    </form>
  );
};

export default CreateContact;
