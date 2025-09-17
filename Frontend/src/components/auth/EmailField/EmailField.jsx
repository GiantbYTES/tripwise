import { useState } from "react";
import {emailValidation} from "../../../utils/validations/emailValidation.js"
import "../AuthField.css"
export function EmailField({value,onChange,onValidChange}){
    const [isValid,setIsValid] = useState({valid:false,rules:{}})
    function handleChange(event){        
        const email= event.target.value;        
        onChange(email)

        const result = emailValidation(email)
        setIsValid(result)
        onValidChange(result.valid)
        
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