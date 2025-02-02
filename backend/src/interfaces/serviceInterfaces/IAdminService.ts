import { IUser } from "../entityInterfaces/IUser";


export interface IAdminService {
    createUser(userData: Partial<IUser>): Promise<IUser> | null;
    updateUser(userData: Partial<IUser>): Promise<IUser> | null;
    getAllUsers(): Promise<IUser[]>;
    getUserStatistics():Promise<IUser[]>
    deleteUser(id: string): Promise<void>;
}