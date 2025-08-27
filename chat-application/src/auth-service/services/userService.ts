import bcrypt from 'bcrypt';

interface User {
    id: string;
    username: string;
    password: string;
}

class UserService {
    public async authenticateUser(username: string, password: string, mockDatabase: User[]): Promise<User> {
        const user = mockDatabase.find((user) => user.username === username);
        if(!user) {
            throw new Error('Invalid Username or Password')
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            throw new Error('Invalid Username or Password')
        }

        return user;
    }   
};

export default UserService;
