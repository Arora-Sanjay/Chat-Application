var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import { UserController } from '../../auth-service/controllers/userController.js';
import messageApiRouter from '../../message-api/index.js';
import axios from 'axios';
const userController = new UserController();
const router = Router();
router.post('/auth/login', (req, res) => userController.login(req, res));
router.use('/messages', messageApiRouter); // Delegate /messages routes to message API
// Forward /chat/send to the chat service (assume running on localhost:4000)
router.post('/chat/send', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios.post('http://localhost:4000/chat/send', req.body);
        res.status(response.status).json(response.data);
    }
    catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
        }
        else {
            res.status(500).json({ error: 'Failed to forward chat message' });
        }
    }
}));
export default router;
