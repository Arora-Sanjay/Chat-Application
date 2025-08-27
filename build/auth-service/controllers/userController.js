var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import JwtService from "../services/jwtService.js";
import bcrypt from 'bcrypt';
const mockDatabase = [
    {
        id: '1',
        username: 'sanjay',
        // bcrypt hash for 'password123'
        password: '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZGHF4gh5rY3l2Wf5rQ8bYy3Q0vYyW',
    },
    {
        id: '2',
        username: 'arora',
        // bcrypt hash for 'password123'
        password: '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZGHF4gh5rY3l2Wf5rQ8bYy3Q0vYyW',
    }
];
export class UserService {
    authenticateUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = mockDatabase.find((user) => user.username === username);
            if (!user) {
                throw new Error('Invalid Username or Password');
            }
            const isPasswordValid = yield bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid Username or Password');
            }
            return user;
        });
    }
}
;
export class UserController {
    constructor() {
        this.jwtService = new JwtService();
        this.userService = new UserService();
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield this.userService.authenticateUser(username, password);
                const token = this.jwtService.generateToken({ id: user.id }, 15);
                res.status(200).json({ token });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : 'An error occurred';
                res.status(401).json({ message });
            }
        });
    }
}
