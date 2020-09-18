import { Router } from "express";
//
import AuthUser from "@services/AuthUser";

const sessionRouter = Router();

sessionRouter.post("/", async (req, res) => {
  //---> /session
  // Body fields: email, passwd
  const { email, passwd } = req.body;
  const authUser = new AuthUser();

  const { user, token } = await authUser.execute({
    email,
    passwd,
  });
  delete user.passwd;

  return res.json({ user, token });
});

export default sessionRouter;
