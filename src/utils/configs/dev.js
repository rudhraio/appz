const dev = {
    production: false,
    port: 3535,
    logger: true,
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

export default dev;