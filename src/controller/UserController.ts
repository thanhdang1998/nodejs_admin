import { CreateUserValidation } from './../validation/CreateUserValidation';
import bcrypt from 'bcryptjs';
import { User } from './../entity/UserEntity';
import { getManager } from 'typeorm';
import { Request, Response } from 'express';


export const GetListUser = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(User);

        const users = await repository.find({relations: ['role']});
        res.send(users.map(u => {
            const {password, ...data} = u;

            return data;
        }))
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}

export const GetDetailUser = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(User);
        const params = req.params;

        const {password, ...user} = await repository.findOne(params.id,{
            relations: ['role']
        });

        if(user) {
            res.send(user);
        } else {
            res.send({
                message: "user not found"
            })
        }
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}

export const CreateUser = async (req: Request, res: Response) => {
    try {
        const {role_id, ...body} = req.body;

        const {error} = CreateUserValidation.validate(body);
        if(error){
            return res.status(400).send(error.details);
        }

        const repository = getManager().getRepository(User);

        const {password, ...user} = await repository.save({
            ...body, 
            password: await bcrypt.hash('1234', 10),
            role: {
                id: role_id
            }
        });

        res.send(user);
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}

export const UpdateUser = async (req: Request, res: Response) => {
    try {
        const {role_id, ...body} = req.body;
        const params = req.params;

        const repository = getManager().getRepository(User);

        const {password, ...user} = await repository.findOne(params.id);

        if(user) {
            await repository.update(params.id, {
                ...body, 
                role: {
                    id: role_id
                }
            });
            const {password, ...user} = await repository.findOne(params.id, {relations: ['role']});
            res.send(user);
        } else {
            res.send({
                message: "user not found"
            })
        }

    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}

export const DeleteUser = async (req: Request, res: Response) => {
    try {
        const params = req.params;
        const repository = getManager().getRepository(User);

        const {password, ...user} = await repository.findOne(params.id);

        await repository.delete(user);

        res.send({
            message: "delete success"
        })
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}