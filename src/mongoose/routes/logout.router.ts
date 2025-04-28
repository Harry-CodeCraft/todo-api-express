import { Router } from "express";
import { logoutUser } from "../../controller/logout-controller.js";

const router = Router();

router.post("/log", logoutUser);

export { router as logoutRouter };
