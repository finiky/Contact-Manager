import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Button from "./Button";
const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchContacts = async () => {
      const cookies = new Cookies();
      const accessToken = cookies.get("JWT-Authorization");
      const response = await fetch("http://localhost:5002/api/contacts", {
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
    <ul>
      {contacts.map((contact) => {
        return (
          <li key={contact._id}>
            <p>{contact.name}</p>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <div>
              <Button contactid={contact._id}>View Contact</Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Contacts;
