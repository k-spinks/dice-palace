import React from 'react'
import { insertGame } from '../dataHelper'

export default function Form (props) {
  const { doRefresh } = props

  async function handleSubmit (e) {
    e.preventDefault()

    // Access the form elements by their IDs or names
    const gameId = Number(e.target.elements.gameId.value)
    const gameTitle = e.target.elements.gameTitle.value
    const gameYear = Number(e.target.elements.gameYear.value)
    const gameDescription = e.target.elements.gameDescription.value
    const gamePublisher = e.target.elements.gamePublisher.value
    const gameRating = Number(e.target.elements.gameRating.value)

    // Construct an object with the form data
    const formData = {
      id: gameId,
      title: gameTitle,
      year: gameYear,
      description: gameDescription,
      publisher: gamePublisher,
      rating: gameRating,
      playtime: {
        minplaytime: 0,
        maxplaytime: 0
      }
    }
    console.log(formData)
    if (formData) {
      try {
        const stringObj = JSON.stringify(formData)
        const res = await insertGame(stringObj)
        doRefresh()
        console.log(res.data)
      } catch (error) {
        console.log('failed to insert game')
        console.log(error)
      }
    }
  }
  return (
    <div id="form">
      <form onSubmit={handleSubmit}>
        <h2>{'Add a New Game'}</h2>
        <p>
          <span className="requiredField">{'*'}</span>
          {'Are required'}
        </p>
        <div className="form-group col-md-6">
          <label htmlFor="gameId">
            {'ID Number'}
            <span className="requiredField">
              {' '}
              {'*'}
            </span>
          </label>
          <input
            type="text"
            id="gameId"
            name="gameId"
            className="form-control-sm"
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="gameTitle">
            {'Title'}
            <span className="requiredField">
              {' '}
              {'*'}
            </span>
          </label>
          <input
            type="text"
            id="gameTitle"
            name="gameTitle"
            className="form-control-sm"
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="gameYear">
            {'Year'}
            <span className="requiredField">
              {' '}
              {'*'}
            </span>
          </label>
          <input
            type="text"
            id="gameYear"
            name="gameYear"
            className="form-control-sm"
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="gameDescription">
            {'Description'}
            <span className="requiredField">
              {' '}
              {'*'}
            </span>
          </label>
          <input
            type="textarea"
            id="gameDescription"
            name="gameDescription"
            className="form-control-sm"
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="gamePublisher">
            {'Publisher'}
            <span className="requiredField">
              {' '}
              {'*'}
              {' '}
            </span>
          </label>
          <input
            type="text"
            id="gamePublisher"
            name="gamePublisher"
            className="form-control-sm"
          />
        </div>

        <div className="form-group col-md-6">
          <label htmlFor="gameRating">
            {'Rating'}
            {' '}
            <span className="requiredField">
              {' '}
              {'*'}
            </span>
          </label>
          <input
            type="text"
            id="gameRating"
            name="gameRating"
            className="form-control-sm mb-3"
          />
        </div>

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
                {'Add more'}
              </button>
            </h2>
            <div
              id="flush-collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="flush-headingOne"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                {/* more input fields */}
                <div className="form-group col-md-6">
                  <div className="form-group col-md-6">
                    <label htmlFor="gamePlaytime">{'Playtime'}</label>
                    <input
                      type="text"
                      id="gamePlaytime"
                      name="gamePlaytime"
                      className="form-control-sm mb-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary" id="addGame">
          {'Add Game'}
        </button>
      </form>
    </div>
  )
}
