import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import styles from "./Contact.module.css";
const Contact = () => {
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editError, setEditError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const { contactid } = useParams();

  useEffect(() => {
    if (!edit) {
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
            setContact(contactInfo[0]);
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
    }
  }, [contactid, edit]);
  const handleDelete = async () => {
    if (
      window.confirm(
        "Click 'OK' to permenently delete the contact or 'Cancel' to not delete. This action cannot be undone."
      )
    ) {
      const cookies = new Cookies();
      const accessToken = cookies.get("JWT-Authorization");
      const response = await fetch(
        `http://localhost:5002/api/contacts/${contactid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        navigate("/contacts");
      }
    } else {
      navigate(`/contacts/${contactid}`);
    }
  };
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
      setEditError(false);
      setEdit(false);
    } else {
      setEditError(true);
    }
  };
  if (edit) {
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
            <Link
              className={styles.link}
              onClick={() => setEdit(false)}
              to={`/contacts/${contactid}`}
            >
              Cancel
            </Link>
          </button>
        </div>
      </form>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return (
      <div>
        <p>Error loading contact information.</p>
        <button>
          <Link to="/contacts">All Contacts</Link>
        </button>
      </div>
    );
  }
  if (editError) {
    return (
      <div>
        <p>Error editing the contact.</p>;
        <Link to={`/contacts/${contactid}`}>View Contact</Link>
      </div>
    );
  }
  return (
    <div className={styles.contact}>
      <div className={styles.name}>
        <label htmlFor="name">Name:</label>
        <p id="name" className>
          {contact.name}
        </p>
      </div>
      <div className={styles.email}>
        <label htmlFor="email">Email:</label>
        <p id="email" className>
          {contact.email}
        </p>
      </div>
      <div className={styles.phone}>
        <label htmlFor="phone">Email:</label>
        <p id="phone" className>
          {contact.phone}
        </p>
      </div>
      <div className={styles.buttons}>
        <button className={styles.but} onClick={() => setEdit(true)}>
          Edit Contact
        </button>
        <button className={styles.but} onClick={handleDelete}>
          Delete Contact
        </button>
        <button className={styles.but}>
          <Link className={styles.link} to="/contacts">
            View Contacts
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Contact;
