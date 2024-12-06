import { config } from 'dotenv'
config()

const _config = {
    APP_PORT: process.env.APP_PORT,
    DB_URL: process.env.DB_URL,
}

console.log("App Port From Config File..", _config.DB_URL);
export { _config as config }