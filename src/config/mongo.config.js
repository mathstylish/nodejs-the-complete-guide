const { MongoClient, ServerApiVersion } = require('mongodb')

const $env = require('./env')

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
    return await client.connect()
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
}

module.exports = mongoConnect