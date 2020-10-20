import { Router } from "express";
import { container } from "tsyringe";
//
import AuthUser from "@modules/users/services/AuthUser";

const sessionRouter = Router();

sessionRouter.post("/", async (req, res) => {
  //---> /session
  // Body fields: email, passwd
  const { email, passwd } = req.body;

  const authUser = container.resolve(AuthUser);

  const { user, token } = await authUser.execute({
    email,
    passwd,
  });
  delete user.passwd;

  return res.json({ user, token });
});

export default sessionRouter;
