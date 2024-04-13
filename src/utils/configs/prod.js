const prod = {
    production: true,
    port: process.env.PORT,
    logger: false,
    database: {
        type: 'postgres',
        host: process.env.DBHOST,
        port: process.env.DBPORT,
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        name: process.env.DBNAME,
        schema: process.env.DBSCHEMA
    }
}

export default prod;