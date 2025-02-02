import { IUser } from "../entityInterfaces/IUser";

export interface IUserRepository {
    createUser(userData: IUser): Promise<IUser>;
    findUserByEmail(email: string): Promise<IUser | null>;
    findUserById(userId: string): Promise<IUser | null>;
    getAllUsers(): Promise<IUser[] | null>;
}