import prisma from "../common/prisma";
import { UserRequest } from "../common/types";
import { hash } from "../common/utils/user";


export const findUser = async (username: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const createUser = async (user: UserRequest) => {
    try {
        const password_hash = await hash(user.password);
        const newUser = await prisma.user.create({
            data: {
                password_hash,
                email: user.email,
                username: user.username,
            },
        });
        return newUser;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getAllUsers = async() => {
    try {
        return await prisma.user.findMany({});
    } catch (error) {
        console.log(error);
    }
};