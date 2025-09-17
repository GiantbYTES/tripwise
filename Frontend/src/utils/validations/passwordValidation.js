


export const passwordValidation = (password) =>{
    const rules = {
        length:{
            valid: password.length >= 8,
            message: "At least 8 charecters"
        },
        symbol:{
            valid: /[!@#$%^&*(),.?\":{}|<>]/.test(password),
            message: "At least one special character (!@#$ etc.)" 
        },
        upperCase:{
            valid: /[A-Z]/.test(password),
            message: "At least one Uppercase character"
        },
        lowerCase:{
            valid: /[a-z]/.test(password),
            message:"At least one Lowercase character"
        },
        number:{
            valid:/[0-9]/.test(password),
            message:"At least one number"
        }
    }

    const valid = Object.values(rules).every(rule => rule.valid)
    return {
        valid,
        rules
    }
}