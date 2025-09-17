import { useState } from "react"
import { passwordValidation } from "../../../utils/validations/passwordValidation.js";
import "../AuthField.css"

export function PasswordField({value,onChange,onValidChange}){
   const [rules,setRules] = useState({valid:false,rules:{}});
   
   function handleChange(event){
    const password = event.target.value;
    onChange(password)

    const result = passwordValidation(password)
    setRules(result)
    onValidChange(result.valid)

   }

    return (
        <>
            <div className ="auth-field">
            <label>Password</label>
            <input type="password"
            value={value}
            onChange={handleChange}
             placeholder="Password"
             required
             ></input>
            <ul className="rules">
                {Object.entries(rules.rules).map(([rule,{valid,message}])=>
                (<li key={rule} className={valid? "valid":"invalid"}>
                    {message}
                </li>)
                )}
            </ul>
            </div>
        </>
    )
    }