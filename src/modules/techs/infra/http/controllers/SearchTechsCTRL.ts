import { container } from "tsyringe";
import { Request, Response } from "express";
//
import SearchTechs from "@modules/techs/services/SearchTechs";

export default class SearchTechsCTRL {
  public async index(req: Request, res: Response): Promise<Response> {
    //> /techs/search
    // token required
    const { searchName } = req.body;

    const searchTechs = container.resolve(SearchTechs);

    const tech = await searchTechs.execute(searchName);

    return res.send(tech);
  }
}
