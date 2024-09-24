import bcrypt from 'bcrypt';


const saltRounds = 10;

export const hash = async (string: string) => {
    return await bcrypt.hash(string, saltRounds);
};

export const authenticate = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
};