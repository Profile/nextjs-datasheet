// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import faker from 'faker';

faker.locale = 'az';

const azPhoneFormat = '+994 (##) ###-##-##';

const generateMockedArray = (length = 0, fn = null, ...params) => Array.from({ length }, () => fn(...params));

const employee = () => ({
    id: faker.random.number(),
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    dateOfBirth: faker.date.past(20).toISOString(),
    position: faker.helpers.randomize(['developer', 'underwriter', 'cashier' , 'something']),
    phone: faker.phone.phoneNumber(azPhoneFormat),
});

export default (req, res) => {
    const { query }  = req;
    const { perPage = 20 }  = query;

    res.status(200).json({
        data: generateMockedArray(Math.min(perPage, 30), employee),
        meta: {
            perPage: Math.min(perPage, 30),
            total: 400
        }
    })
}
