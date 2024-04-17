import dotenv from 'dotenv';
dotenv.config();

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
    },
    email: {
        host: process.env.EMAILHOST,
        token: process.env.EMAILTOKEN
    },
    urls: {
        fehost: "https://appzfe.pages.dev"
    }
}

export default prod;