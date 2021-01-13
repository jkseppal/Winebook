import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Table, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { initializeReviews, createReview } from '../reducers/reviewReducer'

/**************
 * Ilmeisesti tilanpäivittymisen yhteydessä päivittyy vain kyseinen tila,
 * mutta ei siihen linkittyneet muut tilat.
 * Esim. luotaessa uusi viini, päivittyy viinien lista,
 * mutta ei käyttäjien viinit. Tätä täytyy tutkia lisää.
 * Myös arvostelujen päivittämättömyys liittynee tähän.
 * 
 * Mahdollisesti tyyliin updateWine -metodi, jolla päivitetään
 * myös arvosteltava viini samalla, kun lisätään arvostelu?
 * 
 * Uusi arvostelu päätyy tilaan reviews,
 * mutta päivittynyt tila ei renderöidy komponentissa.
 *************/

const SingleWine = ({ wines, user, reviews, addLike, addReview }) => {
  
  const [description, setDescription] = useState('')
  const [points, setPoints] = useState('valitse')
  const [vintage, setVintage] = useState('--')

  const dispatch = useDispatch()

  /*useEffect(() => {
    dispatch(initializeReviews())
  },[dispatch])

  let reviews = useSelector(state => state.reviews)*/
  
  const id = useParams().id
  let wineToShow = wines.find(wine => wine.id === id)
  let reviewsToShow = reviews.filter(r => r.wine.id === id)

  const handleLike = (props) => {
    const likedReview = {
      id: props.id,
      wine: props.wine.id,
      user: props.user.id,
      vintage: props.vintage,
      description: props.description,
      points: props.points,
      likes: (props.likes + 1)
    }
    addLike(likedReview)
  }

  let average = null

  if (wineToShow && wineToShow.reviews.length > 0) {
    let sum = 0
    for (let i = 0; i < wineToShow.reviews.length; i++) {
      sum = sum + wineToShow.reviews[i].points
    }
    average = sum / wineToShow.reviews.length
  }

  const handleReviewAdd = (event) => {
    addReview(id, {
      user: user,
      wine: wineToShow,
      description: description,
      points: points,
      vintage: vintage,
    })
    setDescription('')
    setPoints('')
    //wineToShow = wines.find(wine => wine.id === id)
    reviewsToShow = reviews.filter(r => r.wine.id === id)
    
  }

  /*const addReview = (reviewObject) => {
    dispatch(createReview(wineToShow.id, reviewObject))
  }*/

  let pointOptions = []
  for (let i = 0; i < 101; i++) {
    pointOptions.push(i)
  }

  let vintageOptions = []
  for (let i = 1900; i < 2021; i++) {
    vintageOptions.push(i)
  }

  const reviewsByLikes = (reviews) => {
    reviews.sort((a, b) => {
      return b.likes - a.likes
    })
  }

  if (!wineToShow) {
    return null
  }

  const SubmitButton = () => {
    if (points === 'valitse') {
      return (
        <Button variant="success" type="submit" disabled>lisää arvostelu</Button>
      )
    }
    return (
      <Button variant="success" type="submit">lisää arvostelu</Button>
    )
  }

  return (
    <div>
      <h2>{wineToShow.name}</h2>
      <p>
        tyyppi: {wineToShow.type}<br />
        maa: {wineToShow.country}<br />
        alue: {wineToShow.region}<br />
        laatuluokitus: {wineToShow.appellation}<br />
        rypäleet: {wineToShow.grapes}<br />
      </p>
      {average ? <h3>arvostelujen keskiarvo: {average}</h3> : null}
      <div>
        <h3>Arvostelut:</h3>
        <Table striped>
          <thead>
            <tr>
              <th>arvostelija</th>
              <th>arvosteltu vuosikerta</th>
              <th>tykkäykset</th>
              <th>pisteet</th>
              <th>kuvaus</th>
              <th>tykkää</th>
            </tr>
          </thead>
          {/*<tbody>
            {wineToShow.reviews.map(r =>
              <tr key={r.id}>
                <td>{r.user.username}</td>
                <td>{r.vintage}</td>
                <td>{r.likes}</td>
                <td>{r.points}</td>
                <td>{r.description}</td>
                <td>
                  <Button onClick={() => handleLike(r)}>tykkää</Button>
                </td>
              </tr>
            )}
            </tbody>*/}
          <tbody>
            {reviewsByLikes(reviewsToShow)}
            {reviewsToShow.map(r =>
              <tr key={r.id}>
                <td>{r.user.username}</td>
                <td>{r.vintage}</td>
                <td>{r.likes}</td>
                <td>{r.points}</td>
                <td>{r.description}</td>
                <td>
                  <Button onClick={() => handleLike(r)}>tykkää</Button>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      {user ? <div>
        <h3>Lisää arvostelu:</h3>
        <Form onSubmit={handleReviewAdd}>
          <Table>
            <tbody>
              <tr>
                <td>
                  <Form.Label>arvosteltu vuosikerta</Form.Label>
                </td>
                <td>
                  <Form.Control
                    as="select"
                    value={vintage}
                    onChange={({ target }) => setVintage(target.value)}
                  >
                    <option>--</option>
                    {vintageOptions.map(v => (
                      <option key={v}>{v}</option>
                    ))}
                  </Form.Control>
                </td>
              </tr>
              <tr>
                <td>
                  <Form.Label>kuvaus</Form.Label>
                </td>
                <td>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Form.Label>pisteet</Form.Label>
                </td>
                <td>
                  <Form.Control
                    as="select"
                    value={points}
                    onChange={({ target }) => setPoints(target.value)}
                  >
                    <option>valitse</option>
                    {pointOptions.map(p => (
                      <option key={p}>{p}</option>
                    ))}
                  </Form.Control>
                </td>
              </tr>
            </tbody>
          </Table>
          {/*<Button variant="success" type="submit">lisää arvostelu</Button>*/}
          <SubmitButton />
        </Form>
      </div> : null}
    </div>
  )
}

export default SingleWine