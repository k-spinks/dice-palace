// TODO make games refresh without reloading the page
import { retrieveGames, insertGame, deleteGame } from './dataHelper'
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style/style.css'

// ? Trouble importing icons
//import 'bootstrap-icons/icons'

const statusModal = new bootstrap.Modal('#statusModal')
const detailsModal = new bootstrap.Modal('#detailsModal')
const formElement = document.querySelector('form')

document.addEventListener('DOMContentLoaded', async () => {
  // Try to receive game data
  await generateGames()
})

async function generateGames () {
  try {
    const gameData = await retrieveGames()

    if (gameData.error) {
      generateStatusModal(gameData.error, gameData.message)
    } else if (Array.isArray(gameData)) {
      const gameCardParent = document.querySelector('#gameGallery')
      while (gameCardParent.lastChild) {
        gameCardParent.removeChild(gameCardParent.lastChild)
      }
      gameData.forEach((game) => {
        generateNewGameCard(game)
      })
    }
  } catch (e) {
    console.error('Failed to retrieve data')
    console.error(e)
  }
}

async function generateNewGameCard (game) {
  const gameCardParent = document.querySelector('#gameGallery')

  // Generate card for each game in the data array
  const gameCard = document.createElement('div')
  gameCard.classList = 'gameCard col-sm-6 col-md-4 col-lg-3'

  gameCard.innerHTML = `
    <div class='d-flex flex-column justify-content-center align-items-center text-center'>
      <h1 class='gameCardTitle'>${game.title} (${game.year})</h1>
      <i class="bi bi-trash"></i>
      <img class='gameCardImg' src='${game.image}' alt='Preview for the game
      ${game.title}' height='200px'>
      <span class='gameCardPublisher'>Published by: ${game.publisher}</span>
      <br>
      <span class='gameCardRating'>Rating: ${game.rating}</span>
      <br>
      <a class='detailsLink' data-id=${game.id}>Learn More</a>
      <a class='deleteLink text-danger mt-2' data-id=${game.id}>Delete</a>
    </div>
  `
  gameCardParent.appendChild(gameCard)

  // Fix the link tags
  const requestLinks = document.querySelectorAll('.detailsLink')
  const deleteLinks = document.querySelectorAll('.deleteLink')

  // ? Adds listener to learn more
  requestLinks.forEach((link) => {
    if (!link.hasAttribute('data-listener')) {
      link.setAttribute('data-listener', 'true') // Set a flag to indicate that the listener has been added
      link.addEventListener('click', async function clickHandler (event) {
        event.preventDefault()
        const itemId = link.getAttribute('data-id')
        try {
          const responseData = await retrieveGames(itemId)
          if (responseData.error === true) {
            generateStatusModal(responseData.error, responseData.message)
          } else {
            detailsRequested(responseData)
          }
        } catch (error) {
          console.error('Failed to retrieve game details')
          console.error(error)
        }
      })
    }
  })

  // ? Adds listener to delete games
  deleteLinks.forEach((link) => {
    if (!link.hasAttribute('data-listener')) {
      link.setAttribute('data-listener', 'true') // Set a flag to indicate that the listener has been added
      link.addEventListener('click', async function clickHandler (event) {
        event.preventDefault()
        const check = window.confirm('Are you sure you want to delete?')
        if (check) {
          const itemId = Number(link.getAttribute('data-id'))
          const responseData = await deleteGame(itemId)
          if (responseData.error) {
            generateStatusModal(responseData.error, responseData.message)
          } else {
            generateStatusModal(responseData.error, responseData.message)
          }
          generateGames()
        }
      })
    }
  })
}

function generateStatusModal (error, message) {
  document.querySelector('#statusModalLabel').innerText = `
  Error status: ${error}`
  document.querySelector('#statusModalBody').innerText = `
  ${message}`
  if (error === true) {
    document
      .querySelector('#statusModalCard')
      .classList.toggle('bg-danger', true)
    document
      .querySelector('#statusModalCard')
      .classList.toggle('text-white', true)
  } else {
    document
      .querySelector('#statusModalCard')
      .classList.toggle('bg-success', true)
    document
      .querySelector('#statusModalCard')
      .classList.toggle('text-dark', true)
    // document.querySelector('#statusModalBtn').innerText = 'Good!'
  }
  statusModal.show()
}

async function detailsRequested (data) {
  try {
    // Update the details modal content with the retrieved game details
    document.querySelector('#detailModalLabel').innerHTML = `
       <h1 class='text-center text-light'>${data.title} (${data.year})</h1>`
    document.querySelector('#detailModalBody').innerHTML = `
    <div class='d-flex flex-column justify-content-center align-items-center text-center'>
      <img src='${data.image}' alt='Preview for the game ${data.title}' width='350px'>
      <p mb-25>Publisher: ${data.publisher}</p>
      <p>Rating: ${data.rating} 🌟 </br>
      Difficulty: ${data.weight} 🤔 </br>
      Playtime: ${data.playtime.maxplaytime} ⏱️ </br>
      Player Count: ${data.playercount.minplayers} - ${data.playercount.maxplayers} 🧑🏽
      </p>

      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              Description
            </button>
           </h2>
          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">${data.description}
            </div>
          </div>
        </div>
      </div>

      <div class= 'mt-4'>
        <h4>Creative Team: </h4>
        <p>Designer(s): ${data.designers}</p>
        <p>Artist(s): ${data.artists}</p>
      </div>
    `

    detailsModal.show() // Show the details modal
  } catch (error) {
    console.warn('Failed to retrieve game details')
    console.error(error)
  }
}

formElement.addEventListener('submit', async (event) => {
  event.preventDefault()
  const formData = new FormData(formElement)

  const newGameObject = {
    id: Number(formData.get('gameId')),
    title: formData.get('gameTitle'),
    year: Number(formData.get('gameYear')),
    description: formData.get('gameDescription'),
    publisher: formData.get('gamePublisher'),
    rating: Number(formData.get('gameRating'))
  }
  const newGame = JSON.stringify(newGameObject)
  console.log(newGame)
  const responseData = await insertGame(newGame)
  if (responseData.error) {
    generateStatusModal(responseData.error, responseData.message)
  } else {
    generateStatusModal(responseData.error, responseData.message)
  }
  generateGames()
})
