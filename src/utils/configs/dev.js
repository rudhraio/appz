import dotenv from 'dotenv';
dotenv.config();

const dev = {
    production: false,
    port: 3535,
    logger: true,

    jwt: {
        secret: 'YJU4doeOdH4QvBnis2hieDTxNFCBc6aI.MCWHsWkFHROKXC6Asc1fS17onHJNbz9i/NinhRxpPrbXgmQVOcacB9CBGNewyJ2XV',
        exp: '5d',
        refreshsecret: 'E83pR2j9hz0RwAbqErkD0nNMhvMpMDPt.Rklaxt21szOX47ghAHbOQ8PzDkv53Rkj/D6KHIcHnZieC4sYKxQp2yN6jl5zUEnVi',
        refreshexp: '30d'
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
        fehost: "http://localhost:3000"
    }
}

export default dev;