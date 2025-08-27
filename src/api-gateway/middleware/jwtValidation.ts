import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const JWT_SECRET = '';

export const jwtValidation = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token) {
        return res.status(401).json({message: "No token provided"});
    }
    jwt.verify(token, JWT_SECRET, (err: jwt.VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
        if(err) {
            return res.status(403).json({message: "Failed to authenticate"})
        }
        (req as any).user = decoded;
        next();
    });
};