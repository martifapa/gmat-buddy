import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import { SECRET_KEY } from '../config';
import { CustomRequest } from './types';


export const auth = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const token = request.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error('Token invalid');
        }

        const decoded = jwt.verify(token, SECRET_KEY);

        (request as CustomRequest).token = decoded;

        next();
    } catch (error) {
        response.status(401).send('Token invalid');
    }
};