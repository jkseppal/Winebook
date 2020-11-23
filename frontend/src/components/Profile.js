import React, { useState } from 'react'
import { Form, Button, FormCheck } from 'react-bootstrap'

const Profile = ({ user, updateProfile }) => {
  const [description, setDescription] = useState(user.description)
  const [name, setName] = useState(user.name)
  const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState(user.email)
  const [showEmail, setShowEmail] = useState(user.showEmail)
  
  const handleDescriptionAdd = (event) => {
    event.preventDefault()
    updateProfile({
      ...user,
      description: description
    })
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    updateProfile({
      ...user,
      name: name
    })
  }

  const handleUsernameChange = (event) => {
    event.preventDefault()
    updateProfile({
      ...user,
      username: username
    })
  }

  const handleEmailChange = (event) => {
    event.preventDefault()
    updateProfile({
      ...user,
      email: email,
      showEmail: showEmail
    })
  }

  /*const handleEmailShowChange = (event) => {
    //event.preventDefault()
    updateProfile({
      ...user,
      showEmail: showEmail
    })
    setShowEmail(event.target.value)
  }*/
  
  return (
    <div>
      <h2>Oma profiili</h2>
      <div>
        <Form onSubmit={handleNameChange}>
          <Form.Label>Nimi:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <Button type="submit">vaihda nimi</Button>
        </Form>
      </div>
      <div>
        <Form onSubmit={handleUsernameChange}>
          <Form.Label>Käyttäjätunnus:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Button type="submit">vaihda käyttäjätunnus</Button>
        </Form>
      </div>
      <div>
        <Form onSubmit={handleEmailChange}>
          <Form.Label>Sähköpostiosoite:</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          {/*<Form.Check
            type="switch"
            id="email-showing-switch"
            label="näytä sähköpostiosoite muille käyttäjille"
            checked={showEmail}
            onClick={() => setShowEmail(!showEmail)}
          />*/}
          <FormCheck custom type="switch">
            <FormCheck.Input checked={showEmail} onChange={() => setShowEmail(!showEmail)} />
            <FormCheck.Label onClick={() => setShowEmail(!showEmail)}>
              Näytä sähköpostiosoite muille käyttäjille
            </FormCheck.Label>
          </FormCheck>
          <Button type="submit">päivitä sähköpostiosoite tai sen näkyvyys</Button>
        </Form>
      </div>
      <div>
        <Form onSubmit={handleDescriptionAdd}>
          <Form.Label>Kuvaus:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <Button type="submit">päivitä kuvaus</Button>
        </Form>
      </div>
    </div>
  )
}

export default Profile