import { Router } from "express";
//
import checkAuth from "../middleware/checkAuth";
import ProfileController from "../controllers/ProfileController";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(checkAuth);

//---> /profile
profileRouter.get("/", profileController.show);
profileRouter.patch("/", profileController.update);

export default profileRouter;
