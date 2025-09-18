<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> 76337f265b04e554f2ae1c55ef625238f34f4006
import { AuthForm } from "../../../components/auth/AuthForm/AuthForm.jsx";
import { EmailField } from "../../../components/auth/EmailField/EmailField.jsx";
import { PasswordField } from "../../../components/auth/PasswordField/PasswordField.jsx";
import { ConfirmPasswordField } from "../../../components/auth/ConfirmPasswordField/ConfirmPasswordField.jsx";
import { AuthButton } from "../../../components/auth/AuthButton/AuthButton.jsx";
import "./SignupPage.css";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const isMatch = password === confirmPassword && confirmPassword.length > 0;
  const isValid = isEmailValid && isPasswordValid && isMatch;
<<<<<<< HEAD

  console.log("isValid? ", isValid);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Comtent-Type": "application/json",
      },
      body: JSON.stringify(email, password),
    });
    if (!response.ok) {
      alert("Signup failed");
      setLoading(false);
      throw new Error("Signup failed");
    }
    const data = await response.json();

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", data.user);
    setLoading(false);
    alert("Signup Successful");
    //redirecting to dashboard
=======
const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),        
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
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
>>>>>>> 76337f265b04e554f2ae1c55ef625238f34f4006
  };

  return (
    <>
      <div className="signup-page">
        <div className="signup-form">
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
<<<<<<< HEAD
            <AuthButton
              text="Sign Up"
              disabled={!isValid}
              loading={loading}
              onClick={handleSignup}
            />
=======
            <AuthButton text="Sing Up" disabled={!isValid} loading={loading} onClick={handleSignup}/>
>>>>>>> 76337f265b04e554f2ae1c55ef625238f34f4006
          </AuthForm>
        </div>
      </div>
    </>
  );
}
