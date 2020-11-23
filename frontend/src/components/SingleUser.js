import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const SingleUser = ({ users }) => {
  const id = useParams().id
  const userToShow = users.find(user => user.id === id)

  return (
    <div>
      <h3>käyttäjätunnus: {userToShow.username}</h3>
      <h3>nimi: {userToShow.name}</h3>
      <p>
        <i>{userToShow.description}</i>
      </p>
      {(userToShow.showEmail === true)
        ? <div>
          <h3>Sähköpostiosoite:</h3>
          {userToShow.email}
        </div>
        : null
      }
      <h3>käyttäjän lisäämät viinit:</h3>
      {userToShow.wines.map(wine =>
        <div key={wine.id}>
          <Link to={`/wines/${wine.id}`}>{wine.name}</Link>
        </div>
      )}
      <h3>Käyttäjän arvioimat viinit:</h3>
      {userToShow.reviews.map(r =>
        <div key={r.id}>
          <Link to={`/wines/${r.wine.id}`}>{r.wine.name}</Link>
        </div>
      )}
    </div>
  )
}

export default SingleUser