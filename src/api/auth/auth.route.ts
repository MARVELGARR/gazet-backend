import { Router } from "express";
import { validateResource } from "@app/middlewares";
import { AuthController } from "./auth.controller";
import { registerSchema } from "./auth.schema";

export const authRoute = Router();
const path = '/auth';
const auth = new AuthController();

authRoute.post(`${path}/register`, validateResource(registerSchema), auth.registerUser);