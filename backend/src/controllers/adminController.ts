import { Request, Response, NextFunction } from "express";
import { IAdminService } from "../interfaces/serviceInterfaces/IAdminService";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export class AdminController {
  constructor(private adminService: IAdminService) { }

  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const {
        name,
        email,
        password,
        group,
      } = req.body;
      console.log(req.body)
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        _id: new mongoose.Types.ObjectId().toString(),
        name,
        email,
        password: hashedPassword,
        group,

      };
      const result = await this.adminService.createUser(user);
      res.status(201).json(result);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      } else {
        console.log("An unknown error occured");
      }
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log("Id", id)
      const { name, email, group } = req.body;
      const user = await this.adminService.updateUser({
        id,
        name,
        email,
        group
      });
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
      return;
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.adminService.getAllUsers();
      res.status(200).json({ users });
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }
  async getUserSatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const statistics = await this.adminService.getUserStatistics();
      console.log("Controller statistics", statistics)
      res.json(statistics);
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    console.log(id)
    try {
      await this.adminService.deleteUser(id);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete user' });
    }
  }
}
