import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
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
      <form onSubmit={handleEdit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email Id</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button type="submit">Confirm Edit</button>
        <button>
          <Link onClick={() => setEdit(false)} to={`/contacts/${contactid}`}>
            Cancel Edit
          </Link>
        </button>
      </form>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error loading contact information.</p>;
  }
  if (editError) {
    return <p>Error editing the contact.</p>;
  }
  return (
    <div>
      <p>{contact.name}</p>
      <p>{contact.email}</p>
      <p>{contact.phone}</p>
      <button onClick={() => setEdit(true)}>Edit Contact</button>
      <button onClick={handleDelete}>Delete Contact</button>
      <button>
        <Link to="/contacts">All Contacts</Link>
      </button>
    </div>
  );
};

export default Contact;
