const prod = {
    production: true,
    port: process.env.PORT,
    logger: false,
    jwt: {
        secret: process.env.JWTSECRET,
        exp: process.env.JWTEXP,
        refreshsecret: process.env.JWTREFRESHSECRET,
        refreshexp: process.env.JWTREFRESHEXP
    },
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