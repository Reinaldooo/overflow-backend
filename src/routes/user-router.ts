import { Router } from "express";
//
import CreateUser from "@services/CreateUser";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  //> /users
  // Body fields: name, email, passwd
  try {
    const { name, email, passwd } = req.body;

    const createUser = new CreateUser();

    const user = await createUser.execute({
      name,
      email,
      passwd,
    });
    return res.send(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default userRouter;
