import "./AuthButton.css"
export function AuthButton({text,disabled,loading,onClick}){


    return (
        <>
            <button className="auth-btn" disabled={disabled || loading} onClick={onClick}>
                {loading? "Loading...":text}
            </button>
        </>
    )
}