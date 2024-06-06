import React, { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import GameGrid from './components/GameGrid.jsx'
import BSModal from './components/BSModal.jsx'
import GameDetails from './components/GameDetails.jsx'
import { deleteGame, retrieveGames } from './dataHelper.js'
import Form from './components/Form.jsx'
import { GameContext } from './state/GameContext.js'

export default function App (props) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [gameDetails, setGameDetails] = useState(null)

  const [detailsId, setDetailsId] = useState('')
  const [deleteId, setDeleteId] = useState('')

  const [gridRefresh, setGridRefresh] = useState(false)
  const doRefresh = () => {
    setGridRefresh(!gridRefresh)
  }

  useEffect(() => {
    async function getDetails () {
      try {
        const newDetails = await retrieveGames(detailsId)
        setGameDetails(newDetails)
        setDetailsOpen(true)
      } catch (error) {
        console.log('Failed to retrieve game data')
        console.log(error)
      }
    }

    if (detailsId !== '') {
      if (gameDetails?.id !== detailsId) {
        getDetails()
      } else {
        setDetailsOpen(true)
      }
    }
  }, [detailsId, gameDetails?.id])

  useEffect(() => {
    async function removeGame (gameId) {
      try {
        await deleteGame(gameId)
        setDeleteId(null)
        doRefresh()
      } catch (e) {
        console.log(e)
      }
    }
    if (deleteId) {
      removeGame(deleteId)
    }
  }, [deleteId])

  return (
    <div className="container">
      <Header
        heading="Welcome to The Dice Palace"
        subHeading="Click on any game below to view more information"
      />

      <GameContext.Provider value={gameDetails}>
        <GameGrid
          refresh={gridRefresh}
          requestGameDetails={setDetailsId}
          requestRemovedGame={setDeleteId}
        />

        <BSModal
          title={`${gameDetails?.title}`}
          isOpen={detailsOpen}
          onClose={() => {
            setDetailsOpen(false)
            setDetailsId('')
          }}
        >
          {gameDetails !== null && <GameDetails game={gameDetails} />}
        </BSModal>

        <div id="#form">
          <Form doRefresh={doRefresh} />
        </div>
      </GameContext.Provider>
    </div>
  )
}
