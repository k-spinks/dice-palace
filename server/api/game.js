import Express from 'express'
import * as DB from '../controller/mongoDB.js'

const dbHandle = DB.connect('MyGamesDB')

const dataRouter = new Express.Router()

// ! Route for summarized game list
dataRouter.get('/browse', async (req, res) => {
  try {
    const gameData = await DB.getGames(dbHandle)
    if (!gameData) {
      res.status(400).json({
        error: true,
        message: 'No games to display'
      })
    }

    // Sends a 200 response and encodes as JSON
    res.status(200).json(gameData)
  } catch (error) {
    res.status(500).json({ error: true, message: error.toString() })
  }
})

// ! Route for specific game
dataRouter.get('/browse/:id', async (req, res) => {
  const gameId = Number(req.params.id)
  try {
    const gameDetails = await DB.getSpecificGame(dbHandle, gameId)

    if (!gameDetails) {
      res.status(404).json({
        error: true,
        message: 'Game not found'
      })
    } else {
      res.status(200).json(gameDetails)
    }
  } catch (error) {
    console.log('Error getting specific id')
    res.status(500).json({ error: true })
  }
})

// ! Route for deleting a game
dataRouter.delete('/remove/:id', async (req, res) => {
  const gameId = Number(req.params.id)
  try {
    const result = await DB.removeGame(dbHandle, gameId)
    if (result.deletedCount < 1) {
      res.status(404).json({
        error: true,
        message: `Game id: ${gameId} does not exist`
      })
    } else {
      res.status(200).json({
        error: false,
        message: `Successfully removed game id: ${gameId}`
      })
    }
  } catch (error) {
    console.log(error)
    console.log('failed to delete')
    res.status(500).json({ error: true })
  }
})

dataRouter.use(Express.json())
dataRouter.use(Express.urlencoded({ extended: true }))

// ! Route for adding a new game
dataRouter.put('/insert', async (req, res) => {
  try {
    const newGameRequest = req.body
    console.log(newGameRequest)
    if (!newGameRequest) {
      res.status(400).json({ error: true, message: 'No data to insert' })
    }
    const requiredFields = [
      'id',
      'title',
      'year',
      'description',
      'rating',
      'publisher'
    ]
    const missingFields = []

    const gameData = await DB.getGames(dbHandle)

    // ? Checks if all required fields are filled in
    requiredFields.forEach((field) => {
      if (!newGameRequest.hasOwnProperty(field)) {
        missingFields.push(field)
      }
    })
    if (gameData.find((game) => game.id === newGameRequest.id)) {
      res.status(409).json({
        error: true,
        message: 'Game Id already exists'
      })
    }
    if (missingFields.length !== 0) {
      res.status(400).json({
        error: true,
        message: `Missing required field(s) of: ${missingFields}`
      })
    } else {
      // ? Creates a new game object
      const newGame = {
        id: Number(req.body.id),
        title: req.body.title,
        year: Number(req.body.year),
        description: req.body.description,
        image: req.body.image ?? 'https://placehold.co/250',
        thumbnail: req.body.image ?? 'https://placehold.co/250',
        basegame: req.body.basegame || 'No data provided',
        playercount: {
          minplayers: Number(req.body.playercount?.minplayers) || null,
          maxplayers: Number(req.body.playercount?.maxplayers) || null
        },
        playtime: {
          minplaytime: Number(req.body.playtime?.minplaytime) || null,
          maxplaytime: Number(req.body.playtime?.maxplaytime) || null
        },
        rating:
          Math.round((Number(req.body.rating) + Number.EPSILON) * 100) / 100,
        age: Number(req.body.age) || null,
        weight:
          Math.round((Number(req.body.weight) + Number.EPSILON) * 100) / 100 ||
          null,
        designers: req.body.designers || ['No data provided'],
        artists: req.body.artists || ['No data provided'],
        publisher: req.body.publisher
      }
      const result = await DB.insertGame(dbHandle, newGame)
      if (result.insertedId) {
        res.status(200).json({
          error: false,
          message: `Successfully added game id: ${newGame.id}`
        })
      } else {
        res.status(500).json({ error: true })
      }
    }
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: true })
  }
})
export default dataRouter
