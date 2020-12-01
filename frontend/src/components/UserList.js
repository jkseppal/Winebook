import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
//import { useDispatch, useSelector } from 'react-redux'
//import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const UserList = ({ users, user }) => {
  const [findFilter, setFindFilter] = useState('')

  let usersToShow = users.filter(u => u.username.toLowerCase().includes(findFilter.toLowerCase()))

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

  if (!user) {
    return null
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
      <Table striped>
        <thead>
          <tr>
            <td>Käyttäjänimi</td>
            <td>Lisätyt viinit</td>
            <td>Lisätyt arvostelut</td>
          </tr>
        </thead>
        <tbody>
          {usersToShow.map(u =>
            <tr key={u.id}>
              <td>
                <Link to={`/users/${u.id}`}>{u.username}</Link>
              </td>
              <td>
                {u.wines.length}
              </td>
              <td>
                {u.reviews.length}
              </td>
            </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList
