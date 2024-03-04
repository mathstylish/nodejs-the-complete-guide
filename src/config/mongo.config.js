const { MongoClient, ServerApiVersion } = require('mongodb')

const $env = require('./env')

let _dbPool

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient($env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

const mongoConnect = async () => {
  try {
    const connection = await client.connect()
    _dbPool = connection.db()
  } catch (err) {
    throw err
  } finally {
    await client.close()
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