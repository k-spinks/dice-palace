import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { GameContext } from '../state/GameContext'

export default function GameDetails (props) {
  const game = useContext(GameContext)

  if (!game) {
    return null
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center">
      <img
        src={game.image}
        alt={`Preview for the game ${game.title}`}
        width="350px"
      />
      <p className="mb-25">{`Publisher: ${game.publishers}`}</p>
      <p>{`Rating: ${game.rating} 🌟 `}</p>
      <p>{`Difficulty: ${game.weight} 🤔 `}</p>
      <p>{`Playtime: ${game.playtime.maxplaytime} ⏱️ `}</p>
      <p>
        {`Player Count: ${game.playercount.minplayers} - ${game.playercount.maxplayers} 🧑🏽`}
      </p>

      <div className="accordion accordion-flush" id="accordionFlushExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="flush-headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              {'Description'}
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body">{game.description}</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4>
          {'Creative Team: '}
          {' '}
        </h4>
        <p>
          {'Designer(s): '}
          {game.designers}
        </p>
        <p>
          {'Artist(s): '}
          {game.artists}
        </p>
      </div>
    </div>
  )
}
