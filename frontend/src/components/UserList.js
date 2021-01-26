import React, { useState } from 'react'
import { Table, Form, Row, Col } from 'react-bootstrap'
//import { useDispatch, useSelector } from 'react-redux'
//import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const UserList = ({ users, user }) => {
  const [findFilter, setFindFilter] = useState('')
  const [sort, setSort] = useState('name')

  let usersToShow = users.filter(u => u.username.toLowerCase().includes(findFilter.toLowerCase()))

  const handleFindFilterChange = (event) => {
    setFindFilter(event.target.value)
  }

  const sorter = (users) => {
    if (sort === 'name') {
      usersByUsername(users)
    } else if (sort === 'wines') {
      usersByWines(users)
    } else {
      usersByReviews(users)
    }
  }

  const usersByWines = (users) => {
    users.sort((a, b) => {
      return b.wines.length - a.wines.length
    })
  }

  const usersByReviews = (users) => {
    users.sort((a, b) => {
      return b.reviews.length - a.reviews.length
    })
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
    <div className='wineList'>
      <h2>rekisteröityneet käyttäjät:</h2>
      Hae käyttäjätunnuksella:
        <input
          placeholder="hae..."
          value={findFilter}
          onChange={handleFindFilterChange}
        />
        <Form>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2} style={{ paddingTop: 20 }}>
              Lajittele käyttäjät
            </Form.Label>
            <Col sm={10} style={{ paddingTop: 20 }}>
              <Form.Check
                inline
                type="radio"
                name="userSort"
                label="nimen perusteella"
                onChange={() => setSort("name")}
              />
              <Form.Check
                inline
                type="radio"
                name="userSort"
                label="lisättyjen viinien määrän perusteella"
                onChange={() => setSort("wines")}
              />
              <Form.Check
                inline
                type="radio"
                name="userSort"
                label="arvostelujen määrän perusteella"
                onChange={() => setSort("reviews")}
              />
            </Col>
          </Form.Group>
        </Form>
      {sorter(usersToShow)}
      <Table striped className='tableWrapper'>
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
