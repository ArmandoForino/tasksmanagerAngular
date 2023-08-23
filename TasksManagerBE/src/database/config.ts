enum dialects {
    mysql = 'mysql',
    postgres = 'postgres',
    sqlite = 'sqlite',
    mariadb = 'mariadb',
    mssql = 'mssql',
    db2 = 'db2',
    snowflake = 'snowflake',
    oracle = 'oracle',
}

const DatabaseConfig =  {
    database: 'test_1',
    username: 'username',
    password: 'password',
    host: 'localhost',
    dialect: dialects.postgres,
}

export default DatabaseConfig;

/*  Per tenere a mente cosa mi serve nelle config

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' 
});

*/