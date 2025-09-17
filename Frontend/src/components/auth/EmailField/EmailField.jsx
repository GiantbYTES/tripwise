import { useState } from "react";
import {emailValidation} from "../../../utils/validations/emailValidation.js"
import "../AuthField.css"
export function EmailField({value,onChange}){
    const [isValid,setIsValid] = useState({valid:false,rules:{}})
    function handleChange(event){
        console.log("inside EmailField handleChange");
        
        const email= event.target.value;
        console.log(email);
        
        onChange(email)
        setIsValid(emailValidation(email))
        console.log(isValid);
        
    }

    return(
        <> 
            <div className="auth-field">
            <label>Email</label>
            <input
                type="email"
                placeholder="your@email.com"
                value={value}
                onChange={handleChange}
                required
            ></input>
            <ul className="rules">
               {Object.entries(isValid.rules).map(([rule,{valid,message}])=>(
                <li key={rule} className={valid? "valid":"invalid"}>
                    {message}
                </li>
               ))}
            </ul>
            </div>
        </>
    )
}