import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const RegistrationForm = ({ addUser, users }) => {

  const [newName, setNewName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [retypePassword, setRetypePassword] = useState('')
  const [email, setEmail] = useState('')

  let reservedUser = users.find(u => u.username === newUsername)
  let reservedEmail = users.find(u => u.email === email)

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
  if (newUsername.length > 2 && newName.length > 4 && newPassword.length > 4 && newPassword === retypePassword && !reservedUser && !reservedEmail && email.length > 2) {
    approved = true
  }

  const SubmitButton = () => {
    if (approved === false) {
      return (
        <Button type="submit" disabled>rekisteröidy</Button>
      )
    }
    return (
      <Button
        type="submit"
        id="registration"
      >
        rekisteröidy
      </Button>
    )
  }

  const ReservedUserText = () => {
    if (!reservedUser) {
      return null
    }
    return (
      <div style={{ color: "red" }}>käyttäjätunnus varattu</div>
    )
  }

  const ReservedEmailText = () => {
    if (!reservedEmail) {
      return null
    }
    return (
      <div style={{ color: "red" }}>sähköpostiosoitteella on jo rekisteröidytty sovellukseen</div>
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
      <Form style={{ bottom: 45 }} onSubmit={handleUserAdd}>
        <table>
          <tbody>
            <tr>
              <td>
                <Form.Label>nimi</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id="name"
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
                  id="username"
                  placeholder="väh. 3 kirjainta"
                  value={newUsername}
                  onChange={({ target }) => setNewUsername(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td><ReservedUserText /></td>
            </tr>
            <tr>
              <td>
                <Form.Label>sähköpostiosoite</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  id="email"
                  placeholder="väh. 3 kirjainta"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td><ReservedEmailText /></td>
            </tr>
            <tr>
              <td></td>
              <td style={{ fontSize: 10 }}>
                Sähkopostiosoitetta ei oletusarvoisesti näytetä muille käyttäjille.<br />Jos haluat vaihtaa sähköpostiosoitteen näkyväksi, onnistuu se myöhemmin omasta profiilistasi.
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>salasana</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="password"
                  id="password"
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
                  id="retype-password"
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
        <SubmitButton />
      </Form>
    </div>
  )
}

export default RegistrationForm