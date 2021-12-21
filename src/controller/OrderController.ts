import { OrderItem } from './../entity/OrderItemEntity';
import { Order } from './../entity/OrderEntity';
import { getManager } from 'typeorm';
import { Response, Request } from 'express';
import { Parser } from 'json2csv';


export const GetListOrder = async (req: Request, res: Response) => {
    try {
        const take = 10;
        const page = parseInt(req.query.page as string || '1');

        const repository = getManager().getRepository(Order);

        const [data, total] = await repository.findAndCount({
            take,
            skip: (page - 1) * take,
            relations: ['order_items']
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

export const Export = async (req: Request, res: Response) => {
    try {
        const parser = new Parser({
            fields: ['ID', 'Name', 'Email', 'Product Title', 'Price', 'Quantity']
        });

        const repository = getManager().getRepository(Order);
        const orders = await repository.find({relations: ['order_items']});
        const json = [];

        orders.forEach((order: Order) => {
            json.push({
                ID: order.id,
                Name: order.name,
                Email: order.email,
                'Product Title': '',
                Price: '',
                Quantity: ''
            });

            order.order_items.forEach((item: OrderItem) => {
                json.push({
                    ID: '',
                    Name: '',
                    Email: '',
                    'Product Title': item.product_title,
                    Price: item.price,
                    Quantity: item.quantity
                });
            })
        })

        const csv = parser.parse(json);

        res.header('Content-Type', 'text/csv');
        res.attachment('orders.csv');
        res.send(csv);

    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}

export const Chart = async (req: Request, res: Response) => {
    try {
        const manager = getManager();
        
        const result = await manager.query(`
            SELECT DATE_FORMAT(o.created_at, '%y-%n-%d') as date, SUM(oi.price * oi.quantity) as sum
            FROM \`order\` o JOIN order_item oi
            on o.id = oi.order_id
            GROUP BY date
        `);

        res.send(result);
    } catch (error) {
        res.send(error)
    }
}