import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createReview } from '../reducers/reviewReducer'

const SingleWine = ({ wines, user }) => {
  const dispatch = useDispatch()
  
  const [description, setDescription] = useState('')
  const [points, setPoints] = useState(0)
  const [vintage, setVintage] = useState(0)
  
  const id = useParams().id
  const wineToShow = wines.find(wine => wine.id === id)

  let average = null

  if (wineToShow && wineToShow.reviews.length > 0) {
    let sum = 0
    for (let i = 0; i < wineToShow.reviews.length; i++) {
      sum = sum + wineToShow.reviews[i].points
    }
    average = sum / wineToShow.reviews.length
  }

  const handleReviewAdd = (event) => {
    addReview({
      user: user,
      wine: wineToShow,
      description: description,
      points: points,
      vintage: vintage,
    })
    setDescription('')
    setPoints('')
  }

  const addReview = (reviewObject) => {
    dispatch(createReview(wineToShow.id, reviewObject))
  }

  if (!wineToShow) {
    return null
  }

  return (
    <div>
      <h2>{wineToShow.name}</h2>
      <p>
        tyyppi: {wineToShow.type}<br />
        alue: {wineToShow.region}<br />
        rypäleet: {wineToShow.grapes}<br />
      </p>
      {average ? <h3>arvostelujen keskiarvo: {average}</h3> : null}
      <div>
        <h3>Arvostelut:</h3>
        {wineToShow.reviews.map(r =>
          <div key={r.id}>
            <p>
              arvostelija:<br />
              {r.user.username}
            </p>
            <p>
              arvosteltu vuosikerta:<br />
              {r.vintage}
            </p>
            <p>
              kuvaus:<br />
              {r.description}
            </p>
            <p>
              pisteet:<br />
              {r.points}
            </p>
          </div>
        )}
      </div>
      {user ? <div>
        <h3>Lisää arvostelu:</h3>
        <form onSubmit={handleReviewAdd}>
          <div>
            arvosteltu vuosikerta
            <input
              type="text"
              value={vintage}
              onChange={({ target }) => setVintage(target.value)}
            />
          </div>
          <div>
            kuvaus
            <input
              type="text"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
          </div>
          <div>
            pisteet
            <input
              type="text"
              value={points}
             onChange={({ target }) => setPoints(target.value)}
            />
          </div>
          <button type="submit">lisää</button>
        </form>
      </div> : null}
    </div>
  )
}

export default SingleWine