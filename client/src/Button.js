import { useNavigate } from "react-router-dom";
const Button = ({ className, contactid, children }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/contacts/${contactid}`);
  };
  return <button className={className} onClick={handleClick}>{children}</button>;
};

export default Button;
