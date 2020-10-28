import React, { useState, useEffect } from 'react'
//import wineService from '../services/wines'
import reviewService from '../services/reviews'

const Wine = ({ wine, user }) => {
  const [description, setDescription] = useState('')
  const [points, setPoints] = useState(0)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    reviewService.getReviews().then(revs =>
      setReviews( revs )
    )
    console.log('all reviews from effect: ', reviews)
  }, [])

  const handleReviewAdd = (event) => {
    addReview({
      user: user,
      wine: wine,
      description: description,
      points: points,
    })
    setDescription('')
    setPoints('')
  }

  const addReview = (reviewObject) => {
    reviewService
      .addReview(wine.id, reviewObject)
      .then(returnedReview => {
        setReviews(reviews.concat(returnedReview))
      })
  }

  return (
    <div>
      {console.log('data of wine: ', wine)}
      name: {wine.name}<br />
      region: {wine.region}<br />
      grapes: {wine.grapes}<br />
      added by: {wine.user.username}
      <h3>reviews:</h3>
      {wine.reviews.map(r =>
        <div key={r.id}>
          {console.log('reviews from component: ', r)}
          reviewed by: {r.user.username}<br />
          {/*wine: {r.wine.name}*/}
      <p>{r.description}</p>
          <p>points: {r.points}</p>
        </div>
      )}<br />
      <h3>add a review:</h3>
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
  )
}

export default Wine