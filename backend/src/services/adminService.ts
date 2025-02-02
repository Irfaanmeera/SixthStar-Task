import { IUser } from "../interfaces/entityInterfaces/IUser";
import { IAdminService } from "../interfaces/serviceInterfaces/IAdminService";
import { IUserRepository } from "../interfaces/repositoryInterfaces/IUserRepository";
import { BadRequestError } from "../errors/badrequestError";

export class AdminService implements IAdminService {

  constructor(
    private userRepository: IUserRepository,
  ) { }
  async createUser(user: IUser): Promise<IUser> {
    try {
      const existingUser = await this.userRepository.findUserByEmail(
        user.email!
      );
      if (existingUser) {
        throw new BadRequestError("Student already exists");
      }
      return await this.userRepository.createUser(user);
    } catch (error) {
      console.log(error as Error);
      throw error;
    }
  }

  async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await this.userRepository.getAllUsers();
      return users ?? [];
    } catch (error) {
      console.error(error);
      throw new BadRequestError("Error fetching data");
    }
  }
}
