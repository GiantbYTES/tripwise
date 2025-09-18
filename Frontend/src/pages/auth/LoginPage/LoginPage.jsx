import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AuthForm,
  AuthButton,
  EmailField,
  PasswordField,
} from "../../../components/auth";
import "./LoginPage.css"

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const isValid = isEmailValid && isPasswordValid;




  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
        const result = await fetch("http://localhost:3000/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password})
        })
        if(!result.ok){
            setLoading(false)
            throw new Error("Login failed")
        }
        const navigate = useNavigate()
        navigate("/dashboard",{replace:true,state:{formLogin:true}
        })
        
    }catch(err){
        console.log(err);
        alert("Login failed duo to ",err.error)
        
    }finally{
        setLoading(flase)
    }
  };

  return (
    <>
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
    </>
  );
}
