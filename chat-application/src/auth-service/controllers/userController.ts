import JwtService from "../services/jwtService.js";
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

interface User {
    id: string;
    username: string;
    password: string;
}

const mockDatabase: User[] = [
    {
        id: '1',
        username: 'sanjay',
        // bcrypt hash for 'password123'
        password: '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZGHF4gh5rY3l2Wf5rQ8bYy3Q0vYyW',
    },
    {
        id: '2',
        username: 'arora',
        password: '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZGHF4gh5rY3l2Wf5rQ8bYy3Q0vYyW',
    }
];

import UserService from '../services/userService.js';

export class UserController {
    private userService: UserService;
    private jwtService: JwtService;

    constructor() {
        this.jwtService = new JwtService();
        this.userService = new UserService();
    }

    public async login(req: Request, res: Response): Promise<void> {
        try{
            const {username, password} = req.body;
            const user = await this.userService.authenticateUser(username, password, mockDatabase);
            const token = this.jwtService.generateToken({ id: user.id }, 15);
            res.status(200).json({token});
        } catch (error ){
            const message = error instanceof Error ? error.message : 'An error occurred';
            res.status(401).json({message})
        }
    }
}