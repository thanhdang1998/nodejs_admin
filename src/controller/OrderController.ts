import { Order } from './../entity/OrderEntity';
import { getManager } from 'typeorm';
import { Response, Request } from 'express';


export const GetListOrder = async (req: Request, res: Response) => {
    try {
        const take = 10;
        const page = parseInt(req.query.page as string || '1');

        const repository = getManager().getRepository(Order);

        const [data, total] = await repository.findAndCount({
            take,
            skip: (page - 1) * take,
            relations: ['orderItem']
        });
        
        res.send({
            data: data.map((order: Order) => ({
                id: order.id,
                name: order.name,
                email: order.email,
                total: order.total,
                created_at: order.created_at,
                order_items: order.order_items,
            })),
            meta: {
                total,
                page,
                last_page: Math.ceil(total / take)
            }
        }); 
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}