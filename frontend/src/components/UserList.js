import React, { useState } from 'react'
//import { useDispatch, useSelector } from 'react-redux'
//import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  const [findFilter, setFindFilter] = useState('')

  let usersToShow = users.filter(u => u.username.includes(findFilter))

  const handleFindFilterChange = (event) => {
    setFindFilter(event.target.value)
  }

  const usersByUsername = (users) => {
    users.sort((a, b) => {
      if (a.username.toLowerCase() < b.username.toLowerCase()) { return -1 }
      if (a.username.toLowerCase() > b.username.toLowerCase()) { return 1 }
      return 0
    })
  }

  return (
    <div>
      <h2>rekisteröityneet käyttäjät:</h2>
      Hae käyttäjätunnuksella:
        <input
          placeholder="hae..."
          value={findFilter}
          onChange={handleFindFilterChange}
        />
      {usersByUsername(usersToShow)}
      {usersToShow.map(u =>
        <div key={u.id}>
          <Link to={`/users/${u.id}`}>{u.username}</Link>
        </div>
      )}
    </div>
  )
}

export default UserList
