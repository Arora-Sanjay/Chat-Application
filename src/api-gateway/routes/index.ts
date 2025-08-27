import { Router } from 'express';
import { jwtValidation } from '../middleware/jwtValidation.js';
import { UserController } from '../../auth-service/controllers/userController.js';
import messageApiRouter from '../../message-api/index.js';
import axios from 'axios';

const userController = new UserController();

const router = Router();

router.post('/auth/login', (req, res) => userController.login(req, res));
router.use('/messages', messageApiRouter);


router.post('/chat/send', async (req, res) => {
  try {
    const response = await axios.post('http://localhost:4000/chat/send', req.body);
    res.status(response.status).json(response.data);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Failed to forward chat message' });
    }
  }
});

export default router;