import databaseOptions from "../database/ormconfig";

const dbOptions = databaseOptions as any;

dbOptions.host = "ig-postgres";

export default dbOptions;
