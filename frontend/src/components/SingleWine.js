import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import reviewService from '../services/reviews'

const SingleWine = ({ wines, user }) => {
  const [description, setDescription] = useState('')
  const [points, setPoints] = useState(0)
  const [reviews, setReviews] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect(() => {
    reviewService.getReviews().then(revs =>
      setReviews( revs )
    )
    console.log('all reviews from effect: ', reviews)
  }, [])
  
  const id = useParams().id
  const wineToShow = wines.find(wine => wine.id === id)

  const handleReviewAdd = (event) => {
    addReview({
      user: user,
      wine: wineToShow,
      description: description,
      points: points,
    })
    setDescription('')
    setPoints('')
  }

  const addReview = (reviewObject) => {
    reviewService
      .addReview(wineToShow.id, reviewObject)
      .then(returnedReview => {
        setReviews(reviews.concat(returnedReview))
      })
  }

  if (!wineToShow) {
    return null
  }

  return (
    <div>
      <h2>{wineToShow.name}</h2>
      <p>
        alue: {wineToShow.region}<br />
        rypäleet: {wineToShow.grapes}<br />
      </p>
      <div>
        <h3>Arvostelut:</h3>
        {wineToShow.reviews.map(r =>
          <div key={r.id}>
            <p>
              arvostelija:<br />
              {r.user.username}
            </p>
            <p>
              arvostelu:<br />
              {r.description}
            </p>
            <p>
              pisteet:<br />
              {r.points}
            </p>
          </div>
        )}
      </div>
      <div>
        <h3>Lisää arvostelu:</h3>
        <form onSubmit={handleReviewAdd}>
        <div>
          description
          <input
            type="text"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>
        <div>
          points
          <input
            type="text"
            value={points}
            onChange={({ target }) => setPoints(target.value)}
          />
        </div>
        <button type="submit">add a review</button>
      </form>
      </div>
    </div>
  )
}

export default SingleWine