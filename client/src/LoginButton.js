import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const LoginButton = ({ loginStatus, setLoginStatus, className }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const handleLogin = () => {
    if (loginStatus === "Logout") {
      cookies.remove("JWT-Authorization", {
        path: "/",
        domain: window.location.hostname,
      });
      setLoginStatus("Login");
      navigate("/login");
    }
    if (loginStatus === "Login") {
      navigate("/login");
    }
  };
  return (
    <button className={className} onClick={(e) => handleLogin(e)}>
      {loginStatus}
    </button>
  );
};

export default LoginButton;
