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

  return (
    <div>
      <h2>rekisteröityneet käyttäjät:</h2>
      Hae käyttäjätunnuksella:
        <input
          placeholder="hae..."
          value={findFilter}
          onChange={handleFindFilterChange}
        />
      {usersToShow.map(u =>
        <div key={u.id}>
          <Link to={`/users/${u.id}`}>{u.username}</Link>
        </div>
      )}
    </div>
  )
}

export default UserList
