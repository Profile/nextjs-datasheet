const validate = (key, rest, validationSchema) => {
    const validate = validationSchema[key];
    if(!validate) return null;

    for (const fn of Object.values(validate)) {
        const message = fn(rest[key]);

        if(message) {
            return message
        }
    }

}

export default validate;