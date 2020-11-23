import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
//import { useDispatch } from 'react-redux'
//import { errorMessageChange } from '../reducers/errorReducer'
//import { notificationChange } from '../reducers/notificationReducer'
//import userService from '../services/users'

const RegistrationForm = ({ addUser, users }) => {
  //const dispatch = useDispatch()

  const [newName, setNewName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [email, setEmail] = useState('')

  let reservedUser = users.find(u => u.username === newUsername)

  const handleUserAdd = (event) => {
    event.preventDefault()
    addUser({
      name: newName,
      username: newUsername,
      email: email,
      password: newPassword
    })
    setNewName('')
    setNewUsername('')
    setEmail('')
    setNewPassword('')
    setRetypePassword('')
  }

  let approved = false
  if (newUsername.length > 2 && newName.length > 4 && newPassword.length > 4 && newPassword === retypePassword && !reservedUser) {
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

  const ReservedText = () => {
    if (!reservedUser) {
      return null
    }
    return (
      <div style={{ color: "red" }}>käyttäjätunnus varattu</div>
    )
  }

  const IncorrectPassword = () => {
    if (newPassword === retypePassword) {
      return null
    }
    return (
      <div style={{ color: "red" }}>salasanat eivät täsmää</div>
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
              <td></td>
              <td><ReservedText /></td>
            </tr>
            <tr>
              <td>
                <Form.Label>sähköpostiosoite</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="väh. 3 kirjainta"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
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
            <tr>
              <td></td>
              <td><IncorrectPassword /></td>
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