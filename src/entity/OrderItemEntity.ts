import { Order } from './OrderEntity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderItem{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_title: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Order)
    @JoinColumn({name: 'order_id'})
    order: Order;
}