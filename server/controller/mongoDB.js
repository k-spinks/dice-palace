import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'

dotenv.config()
const DB_USER = process.env.DB_USER ?? 'nonuser'
const DB_PASS = process.env.DB_PASS ?? 'nonpass'
const DB_SERVER = process.env.DB_SERVER ?? 'unknown'
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_SERVER}/?retryWrites=true&w=majority&appName=MyGames`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export function connect (dbname) {
  try {
    return client.db(dbname)
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getGames (dbHandle) {
  const data = await dbHandle
    .collection('games')
    .find({})
    .project({
      _id: 0,
      id: 1,
      title: 1,
      year: 1,
      genres: 1,
      rating: 1,
      playtime: 1,
      image: 1
    })
    .toArray()

  return data
}

export async function getSpecificGame (dbHandle, gameId) {
  const data = await dbHandle
    .collection('games')
    .findOne({ id: Number(gameId) })

  return data
}

export async function removeGame (dbHandle, gameId) {
  const data = await dbHandle.collection('games').deleteOne({ id: gameId })
  return data
}

export async function insertGame (dbHandle, gameData) {
  const data = await dbHandle.collection('games').insertOne(gameData)
  return data
}
