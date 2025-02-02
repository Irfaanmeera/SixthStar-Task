import { BadRequestError } from "../errors/badrequestError";
import { IUser } from "../interfaces/entityInterfaces/IUser";
import { IUserRepository } from "../interfaces/repositoryInterfaces/IUserRepository";
import { User } from "../models/userModel";
import { BaseRepository } from "./baseRepository";

export class UserRepository
  extends BaseRepository<IUser>
  implements IUserRepository {

  constructor() {
    super(User)
  }

  async createUser(userData: IUser): Promise<IUser> {
    return await this.create(userData)
  }
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await this.findOne({ email });
  }

  async findUserById(userId: string): Promise<IUser | null> {
    const user = await this.findById(userId);
    if (!user) {
      throw new BadRequestError("Invalid Id");
    }
    return user;
  }
  async getAllUsers(): Promise<IUser[]> {
    return await this.findAll();
  }

  async getUserGroups() {
    return await User.aggregate([
      { $group: { _id: '$group', count: { $sum: 1 } } }
    ]);
  }


}