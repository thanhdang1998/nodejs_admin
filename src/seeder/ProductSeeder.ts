import { product } from './../entity/ProductEntity';
import { createConnection, getManager } from 'typeorm';
import faker from 'faker';
import { randomInt } from 'crypto';

createConnection().then(async connection => {
    const repository = getManager().getRepository(product);

    for(let i = 0; i < 30; i++) {
        await repository.save({
            title: faker.lorem.words(2),
            description: faker.lorem.words(20),
            image: faker.image.imageUrl(200,200,'',true),
            price: "10000",
        })
    }

    process.exit(0);
})