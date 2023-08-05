import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
const LoginButton = ({ loginStatus, setLoginStatus }) => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const accessToken = cookies.get("JWT-Authorization");
  if (accessToken) {
    setLoginStatus("Logout");
  } else {
    setLoginStatus("Login");
  }
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
  return <button onClick={(e) => handleLogin(e)}>{loginStatus}</button>;
};

export default LoginButton;
