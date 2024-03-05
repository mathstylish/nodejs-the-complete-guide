const { MongoClient, ServerApiVersion } = require('mongodb')

const appEnv = require('../helpers/env')
const logger = require('../helpers/logger')

let _dbPool

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(appEnv.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

const mongoConnect = async () => {
  try {
    const connection = await client.connect()
    logger.info('mongoDB connected successfully')
    _dbPool = connection.db()
  } catch (err) {
    logger.fatal(err, `[${err.name}] ${err.message}`)
    throw err
  } 
}

const getDb = () => {
  if (_dbPool) {
    return _dbPool
  }
  throw 'No database found!'
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb