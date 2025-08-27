import jwt from 'jsonwebtoken';
class JwtService {
    constructor() {
        this.secretKey = '12345';
    }
    generateToken(payload, expiresIn) {
        return jwt.sign(payload, this.secretKey);
    }
    validateToken(token) {
        try {
            return jwt.verify(token, this.secretKey);
        }
        catch (error) {
            return null;
        }
    }
}
export default JwtService;
