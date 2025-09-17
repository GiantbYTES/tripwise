export const phoneValidation = (phone) => {
    const rules = {
      minLength: {
        valid: phone.replace(/\D/g, "").length >= 10, // at least 10 digits
        message: "At least 10 digits",
      },
      onlyNumbers: {
        valid: /^\+?\d*$/.test(phone), // optional + at start, digits only
        message: "Contains only numbers",
      },
      noSpaces: {
        valid: !/\s/.test(phone),
        message: "Contains no spaces",
      },
    };
  
    const valid = Object.values(rules).every((rule) => rule.valid);
  
    return { valid, rules };
  };
  