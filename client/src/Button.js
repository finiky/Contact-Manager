import { useNavigate } from "react-router-dom";
const Button = ({ contactid, children }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/contacts/${contactid}`);
  };
  return <button onClick={handleClick}>{children}</button>;
};

export default Button;
