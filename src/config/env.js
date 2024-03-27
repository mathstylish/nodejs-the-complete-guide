import envalid from "envalid"

const appEnv = envalid.cleanEnv(process.env, {
    PORT: envalid.port(),
    PINO_LOG_LEVEL: envalid.str({
        choices: ["fatal", "error", "warn", "info", "debug", "trace", "silent"],
        default: "info",
    }),
    NODE_ENV: envalid.str({
        choices: ["development", "production", "test", "staging"],
    }),
    MONGO_URI: envalid.str({
        desc: "set this variable with a valid mongo uri",
    }),
    MONGO_DEV_USER_ID: envalid.str({
        desc: `
        - set this variable as empty string in a .env file
        - run chmod +x create-user-dev.sh in root folder
        - Then run create-user-dev.sh (edit name and email field if you want),
        - Copy generated id from terminal response and update this variable with this id`,
        example: "MONGO_DEV_USER_ID=<generated-id>",
    }),
})

export default appEnv
