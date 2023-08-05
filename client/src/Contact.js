import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import styles from "./Contact.module.css";

const Contact = () => {
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
          setContact(contactInfo[0]);
        }
      } else {
        setLoading(false);
        setError(true);
      }
    };
    fetchContact();
  }, [contactid]);

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
        <button className={styles.but}>
          <Link className={styles.link} to={`/edit/${contactid}`}>
            Edit
          </Link>
        </button>
        <button className={styles.but} onClick={handleDelete}>
          Delete
        </button>
        <button className={styles.but}>
          <Link className={styles.link} to="/contacts">
            Contacts
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Contact;
