import React, { useEffect, useState } from 'react'
import { Form, Button, FormCheck } from 'react-bootstrap'

const Profile = ({ user, updateProfile }) => {
  
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  //const [username, setUsername] = useState(user.username)
  const [email, setEmail] = useState('')
  const [showEmail, setShowEmail] = useState('')

  useEffect(() => {
    if (user) {
      if (user.description) {
        setDescription(user.description)
      } else {
        setDescription('')
      }
      setName(user.name)
      setEmail(user.email)
      setShowEmail(user.showEmail)
    }
  }, [user])
  
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

  /*const handleUsernameChange = (event) => {
    event.preventDefault()
    updateProfile({
      ...user,
      username: username
    })
  }*/

  const handleEmailChange = async (event) => {
    event.preventDefault()
    await updateProfile({
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

  if (!user) {
    return null
  }
  
  return (
    <div className='guide'>
      <h2>Oma profiili: {user.username}</h2>
      <div>
        <Form onSubmit={handleNameChange}>
          <Form.Label>Nimi:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <div className='buttonWrapper'>
            <Button type="submit">vaihda nimi</Button>
          </div>
        </Form>
      </div>
      {/*<div>
        <Form onSubmit={handleUsernameChange}>
          <Form.Label>Käyttäjätunnus:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Button type="submit">vaihda käyttäjätunnus</Button>
        </Form>
      </div>*/}
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
          <div className='buttonWrapper'>
            <Button type="submit">päivitä sähköpostiosoite tai sen näkyvyys</Button>
          </div>
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
          <div className='buttonWrapper'>
            <Button type="submit">päivitä kuvaus</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Profile