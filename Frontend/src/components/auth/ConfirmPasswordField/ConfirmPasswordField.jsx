import "../AuthField.css"

export function ConfirmPasswordField({password,value,onChange}){
    const isMatch = password === value && value.length >0

    return(
        <>
            <div className="auth-field">
            <label>Confirm Password</label>
            <input
                type="password"
                value={value}
                onChange={(e)=> onChange(e.target.value)}
                placeholder="Retype Password"
                required
            />
            <ul className="rules">
                {value.length >0 && 
                (<li className={isMatch? "valid":"invalid"}>
                    {isMatch ?  "Passwords match" : "Passwords do not match"}
                </li>
                )}
            </ul>
            </div>

        </>
    )

}