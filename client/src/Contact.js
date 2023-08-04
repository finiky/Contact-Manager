import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
const Contact = () => {
  const [contact, setContact] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error loading contact information.</p>;
  }
  return (
    <div>
      <p>{contact.name}</p>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
      <button>Edit Contact</button>
      <button>Delete Contact</button>
    </div>
  );
};

export default Contact;
