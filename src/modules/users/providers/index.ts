import { container } from "tsyringe";

// tsyringe is a dependency injection library.
// Check comments on @shared/container

import IHashProvider from "./HashProvider/models/IHashProvider";
import BCrypt from "./HashProvider/implementations/BCrypt";

container.registerSingleton<IHashProvider>("HashProvider", BCrypt);
