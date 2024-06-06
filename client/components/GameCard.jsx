import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import PropTypes from 'prop-types'

const gameCardStyle = {
  margin: '2rem',
  padding: '2rem',
  borderRadius: '30px',
  background: 'rgb(244, 243, 243)'
}

const linkStyle = {
  fontFamily: 'Comic Neue',
  cursor: 'pointer'
}

const gameCardTitleStyle = {
  fontFamily: 'Comic Neue',
  fontWeight: 'bold',
  fontSize: '1.75rem',
  marginBottom: '1.5rem'
}

const fontStyle = {
  fontFamily: 'Comic Neue',
  fontSize: '1.25rem'
}

export default function GameCard (props) {
  const { game, requestGameDetails, requestRemovedGame } = props

  function showDetails () {
    requestGameDetails(game.id)
  }

  function removeGame () {
    requestRemovedGame(game.id)
  }

  return (
    <div className="col text-center headingContainer" style={gameCardStyle}>
      <div>
        <h2 style={gameCardTitleStyle}>
          {game.title}
          {' '}
          {`(${game.year})`}
        </h2>
        <div className="icon">
          <a style={{ cursor: 'pointer' }}>
            <FaTrash color="red" onClick={removeGame} />
          </a>
        </div>
      </div>
      <div className="image-wrapper">
        <img
          className="img"
          src={`${game.image}`}
          alt={`Posters for ${game.title}`}
        />
      </div>
      <div style={fontStyle}>
        <span>{`${game.rating} ⭐`}</span>
      </div>
      <a onClick={showDetails} style={linkStyle}>
        {'Learn More'}
      </a>
    </div>
  )
}

GameCard.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    playtime: PropTypes.number.isRequired
  }).isRequired,
  requestGameDetails: PropTypes.func.isRequired,
  requestRemovedGame: PropTypes.func.isRequired
}
