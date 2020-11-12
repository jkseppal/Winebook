import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createReview } from '../reducers/reviewReducer'
import { Table, Form, Button } from 'react-bootstrap'

const SingleWine = ({ wines, user, reviews, addLike }) => {
  const dispatch = useDispatch()
  
  const [description, setDescription] = useState('')
  const [points, setPoints] = useState(0)
  const [vintage, setVintage] = useState('--')
  
  const id = useParams().id
  const wineToShow = wines.find(wine => wine.id === id)
  const reviewsToShow = reviews.filter(r => r.wine.id === id)

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

  let pointOptions = []
  for (let i = 0; i < 101; i++) {
    pointOptions.push(i)
  }

  let vintageOptions = []
  for (let i = 1900; i < 2021; i++) {
    vintageOptions.push(i)
  }

  if (!wineToShow) {
    return null
  }

  return (
    <div>
      <h2>{wineToShow.name}</h2>
      <p>
        tyyppi: {wineToShow.type}<br />
        maa: {wineToShow.country}<br />
        alue: {wineToShow.region}<br />
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
                    {pointOptions.map(p => (
                      <option key={p}>{p}</option>
                    ))}
                  </Form.Control>
                </td>
              </tr>
            </tbody>
          </Table>
          <Button variant="success" type="submit">lisää arvostelu</Button>
        </Form>
      </div> : null}
    </div>
  )
}

export default SingleWine