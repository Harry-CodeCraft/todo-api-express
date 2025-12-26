import { Router } from "express";
import { AuthEndPoints } from "../api/enums/endpoints.enums.js";
import { loginUser, registerUser } from "../controller/auth-controller.js";
import {
  userLoginValidation,
  userPayloadValidation,
} from "../utils/validation.js";

const router = Router();

router.post(AuthEndPoints.LOGIN, userLoginValidation, loginUser);
router.post(AuthEndPoints.REGISTER, userPayloadValidation, registerUser);

export { router as authRouter };
