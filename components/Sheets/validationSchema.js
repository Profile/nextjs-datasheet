export const validationSchema = {
    dateOfBirth: {
        valid: (value) => {
            const check = !value.toString().match(/^([1-9]|1[012])[- /.]([1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$/g);
            return check ? 'Invalid date' : null
        },
    },
    phone: {
        valid: (value) => {
            const check = !value.toString().match(/^(\+994)[0-9]{9}$/g);
            return check ? 'Invalid phone' : null
        }
    }
};