import "./AuthForm.css"


export function AuthForm({onSubmit,children}){

    function handleSubmit(event){
        event.preventDefault();
        onSubmit()
    }

    return (
        <>
            <div className="auth-form">

            <form onSubmit={handleSubmit}>{children}</form>
            </div>
        </>
    )
}