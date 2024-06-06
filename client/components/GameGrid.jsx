import React, { useState, useEffect } from 'react'
import GameCard from './GameCard.jsx'
import { retrieveGames } from '../dataHelper'

export default function GameGrid (props) {
  const { refresh, ...rest } = props
  const [gameData, setGameData] = useState([])

  useEffect(() => {
    async function getGameData () {
      try {
        const requestedData = await retrieveGames()
        setGameData(requestedData)
      } catch (error) {
        console.log('Failed to retrieve game data')
        console.log(error)
      }
    }
    getGameData()
  }, [refresh])

  const gameCards = []
  gameData.forEach((game) => {
    gameCards.push(<GameCard key={game.id} game={game} {...rest} />)
  })

  return <div className="row mx-auto">{gameCards}</div>
}
