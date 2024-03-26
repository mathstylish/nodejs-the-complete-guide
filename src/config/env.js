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
    MONGO_URI: envalid.str({ default: "" }),
    MONGO_DEV_USER_ID: envalid.str({
        desc: "You must create a user in a some collection in MongoDB and put generated id in this env variable",
        example: "MONGO_DEV_USER_ID=<generated-id>",
    }),
})

export default appEnv
