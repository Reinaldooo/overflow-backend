import handlebars from "handlebars";
import fs from "fs";

import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    // handlebars will coompile the template and the variables into a string
    // containing the html filled with the custom info
    const templateFile = await fs.promises.readFile(file, {
      encoding: "utf-8",
    });
    const parseTemplate = handlebars.compile(templateFile);
    return parseTemplate(variables);
  }
}
