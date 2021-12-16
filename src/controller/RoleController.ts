import { Role } from './../entity/RoleEntity';
import { getManager } from 'typeorm';
import { Request, Response } from 'express';

export const GetListRole = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(Role);
        const role = await repository.find();
        res.send(role);
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}

export const GetDetailRole = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(Role);
        const role = await repository.findOne(req.params.id, {
            relations: ['permission']
        });
        res.send(role);
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}

export const CreateRole = async (req: Request, res: Response) => {
    try {
        const {name, permissions} = req.body;
        const repository = getManager().getRepository(Role);
        
        const role = await repository.save({
            name,
            permission: permissions.map(id => ({id}))
        })

        res.send(role);
        
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}

export const UpdateRole = async (req: Request, res: Response) => {
    try {
        const {name, permissions} = req.body;
        const repository = getManager().getRepository(Role);
        const role = await repository.save({
            id: parseInt(req.params.id),
            name,
            permission: permissions.map(id => ({id}))
        })
        res.send(role);
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}

export const DeleteRole = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(Role);
        await repository.delete(req.params.id);
        res.send({
            message: "delete success"
        });
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}