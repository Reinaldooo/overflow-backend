import handlebars from "handlebars";

import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    // handlebars will coompile the template and the variables into a string
    // containing the html filled with the custom info
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}
