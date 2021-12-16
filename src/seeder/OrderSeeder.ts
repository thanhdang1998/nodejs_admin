import { OrderItem } from './../entity/OrderItemEntity';
import { Order } from './../entity/OrderEntity';
import { createConnection, getManager } from 'typeorm';
import faker from 'faker';

createConnection().then(async connection => {
    const orderRepository = getManager().getRepository(Order);
    const orderItemRepository = getManager().getRepository(OrderItem);

    for (let i = 0; i < 30; i++){
        const order = await orderRepository.save({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email()
        });

        for (let j = 0; j < 3; j++){
            await orderItemRepository.save({
                order,
                product_title: faker.lorem.words(2),
                price: 10000,
                quantity: 3
            })
        }
    }

    process.exit(0);
})