import { Router } from "express";
import { dashboard } from "../controllers/dashboard.controller.js";
import { findUserFromCookies } from "../middlewares/auth.middleware.js";

const router = Router()

router.route('/dashboard').post(findUserFromCookies,dashboard)

export default router