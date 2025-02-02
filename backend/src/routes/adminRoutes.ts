import express, { Router } from 'express';
import { UserRepository } from '../repositories/userRepository';
import { AdminController } from '../controllers/adminController';
import { AdminService } from '../services/adminService';

const adminRouter: Router = express.Router();
const userRepository = new UserRepository();
const adminService = new AdminService(userRepository);
const adminController = new AdminController(adminService);

adminRouter.post('/createUser', (req, res, next) => { adminController.createUser(req, res, next); });
adminRouter.get('/users', (req, res, next) => { adminController.getAllUsers(req, res, next); })
adminRouter.get('/userGroups', (req, res, next) => { adminController.getUserSatistics(req, res, next); })

export default adminRouter;

