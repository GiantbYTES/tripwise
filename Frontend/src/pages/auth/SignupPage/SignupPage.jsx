import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../../../components/auth/AuthForm/AuthForm.jsx";
import { EmailField } from "../../../components/auth/EmailField/EmailField.jsx";
import { PasswordField } from "../../../components/auth/PasswordField/PasswordField.jsx";
import { ConfirmPasswordField } from "../../../components/auth/ConfirmPasswordField/ConfirmPasswordField.jsx";
import { AuthButton } from "../../../components/auth/AuthButton/AuthButton.jsx";
import {useAuth} from "../../../context/AuthContext.jsx"
import "../AuthPage.css";

export function SignupPage() {
  const {signup}  = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const isMatch = password === confirmPassword && confirmPassword.length > 0;
  const isValid = isEmailValid && isPasswordValid && isMatch;
const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
     await signup(email,password)

    
      alert("Signup successful!");
      navigate("/dashboard",{
        replace:true,
        state:{fromSignup:true}});

    } catch (err) {
      console.error(err);
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="auth-page">
        <div className="auth-page-form">
          <h1> Sign Up</h1>
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
            <ConfirmPasswordField
              password={password}
              value={confirmPassword}
              onChange={setConfirmPassword}
            />
            <AuthButton text="Sing Up" disabled={!isValid} loading={loading} onClick={handleSignup}/>
          </AuthForm>
        </div>
      </div>
    </>
  );
}
