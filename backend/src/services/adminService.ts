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

  async updateUser(userData: IUser): Promise<IUser> {
    try {
      return await this.userRepository.updateUser(userData);
    } catch (error) {
      console.error(error);
      throw new Error(
        "An error occurred while updating the user. Please try again."
      );
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
  async getUserStatistics() {
    try {
      const userGroup = await this.userRepository.getUserGroups();
      return userGroup;
    } catch (error) {
      console.error(error);
      throw new BadRequestError("Error fetching data");
    }

  }
  async deleteUser(id: string): Promise<void> {

    try {
      console.log(id)
      await this.userRepository.deleteUser(id);
    } catch (error) {
      console.error(error);
      throw new BadRequestError("Error deleting data");
    }
  }
}
