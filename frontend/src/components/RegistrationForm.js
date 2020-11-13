import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
//import userService from '../services/users'

const RegistrationForm = ({ addUser }) => {
  const [newName, setNewName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')

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
    setRetypePassword('')
  }

  let approved = false
  if (newUsername.length > 4 && newName.length > 2 && newPassword.length > 4 && newPassword === retypePassword) {
    approved = true
  }

  const SubmitButton = () => {
    if (approved === false) {
      return (
        <Button type="submit" disabled>rekisteröidy</Button>
      )
    }
    return (
      <Button type="submit">rekisteröidy</Button>
    )
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
                  placeholder="väh. 5 kirjainta"
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
                  placeholder="väh. 3 kirjainta"
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
                  placeholder="väh. 5 merkkiä"
                  value={newPassword}
                  onChange={({ target }) => setNewPassword(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>salasana uudestaan</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="password"
                  placeholder="väh. 5 merkkiä"
                  value={retypePassword}
                  onChange={({ target }) => setRetypePassword(target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {/*<Button type="submit">rekisteröidy</Button>*/}
        <SubmitButton />
      </Form>
    </div>
  )
}

export default RegistrationForm