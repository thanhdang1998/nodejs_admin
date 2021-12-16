import { product } from './../entity/ProductEntity';
import { getManager } from 'typeorm';
import { Request, Response } from 'express';

export const GetListProduct = async (req: Request, res: Response) => {
    try {
        const take = 5;
        const page = parseInt(req.query.page as string || '1');

        const repository = getManager().getRepository(product);

        const [data, total] = await repository.findAndCount({
            take,
            skip: (page - 1) * take
        });
        
        res.send({
            data,
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

export const GetDetailProduct = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(product);
        const product_detail = await repository.findOne(req.params.id);
        res.send(product_detail);
    } catch (error) {
        res.send({
            message:"try again"
        })
    }
}

export const CreateProduct = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(product);
        const create_product = await repository.save(req.body);
        res.send(create_product);
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}

export const UpdateProduct = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(product);
        const update_product = await repository.update(req.params.id, req.body);
        const product_lated = await repository.findOne(req.params.id);
        res.send(product_lated);
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}

export const DeleteProduct = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(product);
        await repository.delete(req.params.id);
        res.send({
            message: "delete success"
        })
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}