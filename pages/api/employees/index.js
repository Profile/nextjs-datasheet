// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import faker from 'faker';

faker.locale = 'az';

const azPhoneFormat = '+994 (##) ###-##-##';

const generateMockedArray = (length = 0, fn = null, ...params) => Array.from({ length }, () => fn(...params));

const employee = () => ({
    id: faker.random.number(),
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    dateOfBirth: faker.date.past(20).toLocaleDateString(),
    position: faker.random.word(),
    phone: faker.phone.phoneNumber(azPhoneFormat),
});

export default (req, res) => {
    const { query }  = req;
    const { currentPage = 1 }  = query;

    res.status(200).json({
        data: generateMockedArray(15, employee),
        meta: {
            perPage: 15,
            currentPage,
            total: 200,
            maxPage: 200 / 15
        }
    })
}
