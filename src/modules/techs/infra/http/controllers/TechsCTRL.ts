import { container } from "tsyringe";
import { Request, Response } from "express";
import { celebrate, Joi, errors, Segments } from "celebrate";
//
import CreateTech from "@modules/techs/services/CreateTech";
import SearchTechs from "@modules/techs/services/SearchTechs";

export default class TechsCTRL {
  public async index(req: Request, res: Response): Promise<Response> {
    //> /techs/search
    // token required
    // Body fields: searchName
    const { searchName } = req.body;

    const searchTechs = container.resolve(SearchTechs);

    const tech = await searchTechs.execute(searchName);

    return res.send(tech);
  }

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
