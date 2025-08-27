import jwt, { JwtPayload } from 'jsonwebtoken';

class JwtService {
    private secretKey: string;

    constructor() {
        this.secretKey = '12345';
    }

    generateToken(payload: string | object | Buffer, expiresIn: string | number): string {
        return jwt.sign(payload, this.secretKey);
    }

    validateToken(token: string): string | JwtPayload | null {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            return null;
        }
    }
}

export default JwtService;