import { Router } from "express";
//
import PassRecoveryTokenController from "../controllers/PassRecoveryTokenController";
import ResetPasswdController from "../controllers/ResetPasswdController";

const passwdRouter = Router();
const passRecoveryTokenController = new PassRecoveryTokenController();
const resetPasswdController = new ResetPasswdController();

//---> /passwd
passwdRouter.post("/forgot", passRecoveryTokenController.create);
passwdRouter.post("/reset", resetPasswdController.create);

export default passwdRouter;
