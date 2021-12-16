import { product } from './../entity/ProductEntity';
import { getManager } from 'typeorm';
import { Request, Response } from 'express';

export const GetListProduct = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(product)
        const products = await repository.find();
        res.send(products); 
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