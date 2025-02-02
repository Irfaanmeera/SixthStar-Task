import { IUser } from "../entityInterfaces/IUser";


export interface IAdminService {
    createUser(userData: Partial<IUser>): Promise<IUser> | null;
    getAllUsers(): Promise<IUser[]>;
    getUserStatistics():Promise<IUser[]>
   
}