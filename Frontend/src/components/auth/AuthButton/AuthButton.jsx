import "./AuthButton.css"
export function AuthButton({text,disabled,loading}){


    return (
        <>
            <button className="auth-btn" disabled={disabled || loading}>
                {loading? "Loading...":text}
            </button>
        </>
    )
}