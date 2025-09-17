
  export const emailValidation = (email) => {
    console.log("inside emailValidation");
    
    const rules = {
        hasAtSymbol: {
            valid: email.includes("@"),
            message: "Contains @ symbol",
          },
          hasDotAfterAt: {
            valid: /@.+\./.test(email),
            message: "Contains a dot after @",
          },
          noSpaces: {
            valid: !/\s/.test(email),
            message: "Contains no spaces",
          },
          minLength: {
            valid: email.length >= 5,
            message: "At least 5 characters",
          }
    }

    const valid= Object.values(rules).every(rule =>rule.valid)
    return {
        valid,
        rules
    }
  };
  