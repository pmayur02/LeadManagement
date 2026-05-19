import userRouter from "./userRoutes";
import leadRouter from "./leadRoutes";
import { Router } from "express";


const router = Router();

router.use("/users", userRouter);
router.use("/leads", leadRouter);

export default router;