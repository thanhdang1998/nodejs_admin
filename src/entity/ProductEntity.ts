import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    price: string;
}