
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
    const [isEmailValid,setIsEmailValid] = useState(false)
    const [isPasswordValid,setIsPasswordValid]= useState(false)
    const isMatch = password === confirmPassword && confirmPassword.length>0
    const isValid = isEmailValid && isPasswordValid && isMatch

    console.log("isValid? ",isValid);
    
    const handleSignup=()=>{

    }



  return (
    <>
      <div className="signup-page">
        <div className="signup-form">
          <h1> Sign Up</h1>
          <AuthForm>
            <EmailField value={email} onChange={setEmail} onValidChange={setIsEmailValid}/>
            <PasswordField value={password} onChange={setPassword} onValidChange={setIsPasswordValid}/>
            <ConfirmPasswordField password={password} value={confirmPassword} onChange={setConfirmPassword} />
            <AuthButton text="Sing Up" disabled={!isValid}/>
          </AuthForm>
        </div>
      </div>
    </>
  );
}
