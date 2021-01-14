import { createConnections } from "typeorm";

// I could pass the options here, but this function already reads them from
// ormconfig.json
createConnections();
