import { Request, Response, NextFunction } from "express";
import { IAdminService } from "../interfaces/serviceInterfaces/IAdminService";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export class AdminController {
  constructor(private adminService: IAdminService) {}

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

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = {
        _id: new mongoose.Types.ObjectId().toString(),
        name,
        email,
        password: hashedPassword,
        group,
       
      };
      const result = await this.adminService.createUser(user);
      res.status(201).json({ message: "User added successfully" });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return next(error);
      } else {
        console.log("An unknown error occured");
      }
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
}
