import { verify } from 'jsonwebtoken';
import { User } from './../entity/UserEntity';
import { getManager } from 'typeorm';
import { Request, Response } from 'express';

export const AuthMiddlewave = async (req: Request, res: Response, next: Function) => {
    try {
        const jwt = req.cookies['jwt'];

        const payload: any = verify(jwt, process.env.SECRET_KEY);

        if(!payload) {
            return res.status(401).send({
                message: "unauthenticated"
            })
        }

        const repository = getManager().getRepository(User);

        req["user"] = await repository.findOne(payload.id, {relations: ['role', 'role.permission']});
        
        next();
    } catch (error) {
        return res.status(401).send({
            message: "unauthenticated"
        })
    }
}