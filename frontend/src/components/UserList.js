import React from 'react'
//import { useDispatch, useSelector } from 'react-redux'
//import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  /*const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  })

  let users = useSelector(state => state.users)*/

  return (
    <div>
      <h2>rekisteröityneet käyttäjät:</h2>
      {users.map(u =>
        <div key={u.id}>
          <Link to={`/users/${u.id}`}>{u.username}</Link>
        </div>
      )}
    </div>
  )
}

export default UserList
