var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
const mockDatabase = [];
class UserService {
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
export default UserService;
