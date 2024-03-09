const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb')

const appEnv = require('./env')
const logger = require('../helpers/logger')

let _dbPool

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
    logger.error(err, 'error on connecting to database')
  } 
}

const getDb = () => {
  if (_dbPool) {
    return _dbPool
  }
  throw 'No database found!'
}

const parseIdFromHexString = (id) => {
  return ObjectId.createFromHexString(id)
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb
exports.parseIdFromHexString = parseIdFromHexString