import { Router } from "express";
import { UserEndPoints } from "../api/enums/endpoints.enums";
import { validateToken } from "../utils/validate-token";
import {
  deleteUser,
  getUser,
  getUserById,
} from "../controller/user.controller";

const router = Router();
router.get(UserEndPoints.GET_ALL, validateToken, getUser);
router.get(UserEndPoints.GET, validateToken, getUserById);
router.delete(UserEndPoints.DELETE_USER, validateToken, deleteUser);

export { router as UserRouter };
