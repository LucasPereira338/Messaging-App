require("dotenv/config");

const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true
}

module.exports = corsOptions