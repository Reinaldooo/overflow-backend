import { Router } from "express";
//
import AuthUser from "@services/AuthUser";

const sessionRouter = Router();

sessionRouter.post("/", async (req, res) => {
  //> /session
  // Body fields: email, passwd
  try {
    const { email, passwd } = req.body;
    const authUser = new AuthUser();

    const { user, token } = await authUser.execute({
      email,
      passwd,
    });
    delete user.passwd;

    return res.json({ user, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default sessionRouter;
