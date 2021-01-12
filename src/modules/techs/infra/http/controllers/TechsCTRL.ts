import { container } from "tsyringe";
import { Request, Response } from "express";
//
import CreateTech from "@modules/techs/services/CreateTech";

export default class TechsCTRL {
  public async create(req: Request, res: Response): Promise<Response> {
    //> /techs
    // token required
    // Body fields: name, image
    const { userId } = req;
    const { name, image } = req.body;

    const createTech = container.resolve(CreateTech);

    const tech = await createTech.execute({
      name,
      image,
      userId,
    });

    return res.send(tech);
  }
}
