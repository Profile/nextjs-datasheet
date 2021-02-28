const validate = (key, rest, validationSchema) => {
    const validate = validationSchema[key];
    if (!validate) return null;

    const errors = { ...rest.error };

    for (const fn of Object.values(validate)) {
        const message = fn(rest[key]);

        if (message) {
            errors[key] = message;
            break;
        }

        errors[key] = null;
    }

    return errors;
};

export default validate;
