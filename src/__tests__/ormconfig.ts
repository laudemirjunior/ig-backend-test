import databaseOptions from "../database/ormconfig";

const dbOptions = databaseOptions as any;

dbOptions.host = "localhost";

export default dbOptions;
