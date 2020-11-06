import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
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
      <Form onSubmit={handleUserAdd}>
        <table>
          <tbody>
            <tr>
              <td>
                <Form.Label>nimi</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={newName}
                  onChange={({ target }) => setNewName(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>käyttäjätunnus</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={newUsername}
                  onChange={({ target }) => setNewUsername(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>salasana</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={({ target }) => setNewPassword(target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Button type="submit">rekisteröidy</Button>
      </Form>
    </div>
  )
}

export default RegistrationForm