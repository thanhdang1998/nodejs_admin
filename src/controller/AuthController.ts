import {Request, Response} from 'express';
import { getManager } from 'typeorm';
import { User } from '../entity/UserEntity';
import { RegisterValidation } from '../validation/RegisterValidation';
import bcrypt from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

export const Register = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const {error} = RegisterValidation.validate(body);

        if(error){
            return res.status(400).send(error.details);
        }

        if(body.password !== body.password_confirm){
            return res.status(400).send({
                message:"Password's do not match"
            })
        }

        const repository = getManager().getRepository(User);

        const {password, ...user} = await repository.save({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: await bcrypt.hash(body.password, 10),
        })

        res.send(user);
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}

export const Login = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const repository = getManager().getRepository(User);
        
        const user = await repository.findOne({email: body.email});
        if(!user){
            return res.status(404).send({
                message: 'user not found!'
            })
        }

        const credentials = await bcrypt.compare(body.password, user.password);
        if(!credentials){
            return res.status(400).send({
                message: 'invalid credentials'
            })
        }

        const token = sign({id: user.id},process.env.SECRET_KEY)

        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 1000
        })

        res.send({
            message: 'success'
        })
    } catch (error) {
        res.send({
            message: "try again"
        })
    }   
}

export const AuthenticatedUser = async (req: Request, res: Response) => {
    try {
        const {password, ...user} = req["user"];
        res.send(user);
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}

export const Logout = async (req: Request, res: Response) => {
    try {
        res.cookie('jwt','',{maxAge: 0});

        res.send({
            message: "success"
        })
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}

export const UpdateInfo = async (req: Request, res: Response) => {
    try {
        const user = req["user"];
        const body = req.body;

        const repository = getManager().getRepository(User);

        await repository.update(user.id, body);

        const {password, ...data} = await repository.findOne({id: user.id});

        res.send(data);
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}

export const UpdatePassword = async (req: Request, res: Response) => {
    try {
        const user = req["user"];
        const body = req.body;

        if(body.password !== body.password_confirm) {
            return res.status(400).send({
                message: "Password's do not match"
            })
        }

        const repository = getManager().getRepository(User);

        await repository.update(user.id, {
            password: await bcrypt.hash(body.password, 10)
        })

        const {password, ...data} = req["user"];

        res.send(data);
    } catch (error) {
        res.send({
            message: "try again"
        })
    }
}