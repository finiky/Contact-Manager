import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import styles from "./EditContact.module.css";

const EditContact = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { contactid } = useParams();
  useEffect(() => {
    const fetchContact = async () => {
      const cookies = new Cookies();
      const accessToken = cookies.get("JWT-Authorization");
      const response = await fetch(
        `http://localhost:5002/api/contacts/${contactid}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const contactInfo = await response.json();
        if (contactInfo[0]) {
          setError(false);
          setLoading(false);
          setName(contactInfo[0].name);
          setEmail(contactInfo[0].email);
          setPhone(contactInfo[0].phone);
        }
      } else {
        setLoading(false);
        setError(true);
      }
    };
    fetchContact();
  }, [contactid]);

  const handleEdit = async (event) => {
    event.preventDefault();
    const cookies = new Cookies();
    const accessToken = cookies.get("JWT-Authorization");
    const response = await fetch(
      `http://localhost:5002/api/contacts/${contactid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ name, email, phone }),
      }
    );
    if (response.ok) {
      setError(false);
      navigate(`/contacts/${contactid}`);
    } else {
      setError(true);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Error editing the contact.</p>;
        <Link to={`/contacts/${contactid}`}>View Contact</Link>
      </div>
    );
  }

  return (
    <form className={styles.edit} onSubmit={handleEdit}>
      <div className={styles.inputDiv}>
        <label className={styles.label} htmlFor="name">
          Name{" "}
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
          Email Id{" "}
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
          Phone{" "}
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
      <div className={styles.editBut}>
        <button className={styles.but} type="submit">
          Confirm
        </button>
        <button className={styles.but}>
          <Link className={styles.link} to={`/contacts/${contactid}`}>
            Cancel
          </Link>
        </button>
      </div>
    </form>
  );
};

export default EditContact;
