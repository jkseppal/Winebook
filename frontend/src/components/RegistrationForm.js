import React, { useState } from 'react'
//import userService from '../services/users'

const RegistrationForm = ({ addUser }) => {
  const [newName, setNewName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleUserAdd = (event) => {
    event.preventDefault()
    addUser({
      name: newName,
      username: newUsername,
      password: newPassword
    })
    setNewName('')
    setNewUsername('')
    setNewPassword('')
  }

  return (
    <div>
      <h2>Rekisteröidy käyttäjäksi</h2>
      <form onSubmit={handleUserAdd}>
        <div>
          name
          <input
            type="text"
            value={newName}
            onChange={({ target }) => setNewName(target.value)}
          />
        </div>
        <div>
          username
          <input
            type="text"
            value={newUsername}
            onChange={({ target }) => setNewUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={newPassword}
            onChange={({ target }) => setNewPassword(target.value)}
          />
        </div>
        <button type="submit">rekisteröidy</button>
      </form>
    </div>
  )
}

export default RegistrationForm