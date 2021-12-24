import { getManager } from 'typeorm';
import { Request, Response } from 'express';
import { Permission } from '../entity/PermissionEntity';

export const GetListPermission = async (req: Request, res: Response) => {
    try {
        const repository = getManager().getRepository(Permission);
        const permissions = await repository.find();
        res.send(permissions);
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}