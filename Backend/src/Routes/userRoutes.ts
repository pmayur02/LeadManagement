import {Router} from "express";
import {registerUser, login,getCurrentUser,getAllUsers,updateUser,deleteUser} from "../Controllers/userController";
import {authenticateUser, isAdmin} from "../Middlewares/authMiddleware";
import {validate,validateParams} from "../Middlewares/validateJoi";
import * as userValidation from "../validations/userValidation"

const userRouter = Router();

userRouter.post("/register",validate(userValidation.registerUserValidation),registerUser);
userRouter.post("/login",validate(userValidation.loginValidation),login);
userRouter.get("/current-user/:userId",authenticateUser,validateParams(userValidation.getCurrentUserValidation),getCurrentUser);
userRouter.get("/all-users",authenticateUser,isAdmin,getAllUsers);
userRouter.patch("/update-user/:userId",authenticateUser,validateParams(userValidation.getCurrentUserValidation),validate(userValidation.updateUserValidation),updateUser);
userRouter.delete("/delete-user/:userId",authenticateUser,validateParams(userValidation.getCurrentUserValidation),deleteUser);
userRouter.patch("/reset-password",updateUser);

export default userRouter;