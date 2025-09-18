import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../../components/auth/AuthForm/AuthForm.jsx";
import { EmailField } from "../../../components/auth/EmailField/EmailField.jsx";
import { PasswordField } from "../../../components/auth/PasswordField/PasswordField.jsx";
import { AuthButton } from "../../../components/auth/AuthButton/AuthButton.jsx";

import "./LoginPage.css";

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const isValid = isEmailValid && isPasswordValid;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!result.ok) {
        setLoading(false);
        throw new Error("Login failed");
      }
      navigate("/dashboard", { replace: true, state: { formLogin: true } });
    } catch (err) {
      console.log(err);
      alert("Login failed duo to ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-page">
        <div className="auth-page-form">
          <h1> Login</h1>
          <AuthForm>
            <EmailField
              value={email}
              onChange={setEmail}
              onValidChange={setIsEmailValid}
            />
            <PasswordField
              value={password}
              onChange={setPassword}
              onValidChange={setIsPasswordValid}
            />
            <AuthButton
              text="Log in"
              disabled={!isValid}
              loading={loading}
              onClick={handleLogin}
            />
          </AuthForm>
        </div>
      </div>
    </>
  );
}
