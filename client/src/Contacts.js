import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import styles from "./Contacts.module.css";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const handleClick = (a) => {
    navigate(`/contacts/${a}`);
  };
  useEffect(() => {
    const fetchContacts = async () => {
      const cookies = new Cookies();
      const accessToken = cookies.get("JWT-Authorization");
      const response = await fetch(`${process.env.PORT}/api/contacts`, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setloading(false);
        setError(false);
        setContacts(data);
      } else {
        setloading(false);
        setError(true);
      }
    };
    fetchContacts();
  }, []);

  if (error) {
    return <p>Error loading the content.</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul className={styles.ul}>
      {contacts.map((contact) => {
        return (
          <li className={styles.contact} key={contact._id}>
            <div className={styles.name}>
              <label htmlFor="name">Name:</label>
              <p id="name">{contact.name}</p>
            </div>
            <div className={styles.email}>
              <label htmlFor="email">Email:</label>
              <p id="email">{contact.email}</p>
            </div>
            <div className={styles.phone}>
              <label htmlFor="phone">Phone:</label>
              <p id="phone">{contact.phone}</p>
            </div>
            <div className={styles.butDiv}>
              <button
                className={styles.but}
                onClick={() => {
                  handleClick(contact._id);
                }}
              >
                View Contact
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Contacts;
