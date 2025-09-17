
import { useState } from "react";
import { AuthForm } from "../../../components/auth/AuthForm/AuthForm.jsx";
import { EmailField } from "../../../components/auth/EmailField/EmailField.jsx";
import { PasswordField } from "../../../components/auth/PasswordField/PasswordField.jsx";
import { ConfirmPasswordField } from "../../../components/auth/ConfirmPasswordField/ConfirmPasswordField.jsx";
import { AuthButton } from "../../../components/auth/AuthButton/AuthButton.jsx";
import "./SignupPage.css";
export function SignupPage() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const [confirmPassword,setConfirmPassword] = useState("")

    const isMatch = password === confirmPassword && confirmPassword.length>0
    const handleSignup=()=>{

    }



  return (
    <>
      <div className="signup-page">
        <div className="signup-form">
          <h1> Sign Up</h1>
          <AuthForm>
            <EmailField value={email} onChange={setEmail} />
            <PasswordField value={password} onChange={setPassword}/>
            <ConfirmPasswordField password={password} value={confirmPassword} onChange={setConfirmPassword} />
            <AuthButton text="Sing Up" disabled={!isMatch}/>
          </AuthForm>
        </div>
      </div>
    </>
  );
}
