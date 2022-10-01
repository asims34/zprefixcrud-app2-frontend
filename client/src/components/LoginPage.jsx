import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ width: "90%", margin: "10px", textAlign: "center" }}>
      <Button onClick={() => navigate("/login-form")}>Please Log In</Button>
      <Button onClick={() => navigate("/guest")}>Continue As Guest</Button>
      <Button onClick={() => navigate("/signup")}>Sign Up</Button>
    </div>
  );
};

export default LoginPage;
