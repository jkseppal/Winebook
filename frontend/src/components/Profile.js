import React, { useEffect, useState } from 'react'
import { Form, Button, FormCheck } from 'react-bootstrap'

const Profile = ({ user, updateProfile }) => {
  
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showEmail, setShowEmail] = useState('')
  const [facebook, setFacebook] = useState('')
  const [showFacebook, setShowFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [showInstagram, setShowInstagram] = useState('')
  const [twitter, setTwitter] = useState('')
  const [showTwitter, setShowTwitter] = useState('')

  useEffect(() => {
    if (user) {
      if (user.description) {
        setDescription(user.description)
      } else {
        setDescription('')
      }
      if (user.facebook) {
        setFacebook(user.facebook)
      }
      if (user.instagram) {
        setInstagram(user.instagram)
      }
      if (user.twitter) {
        setTwitter(user.twitter)
      }
      setName(user.name)
      setEmail(user.email)
      setShowEmail(user.showEmail)
      setShowFacebook(user.showFacebook)
      setShowInstagram(user.showInstagram)
      setShowTwitter(user.showTwitter)
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

  const handleEmailChange = (event) => {
    event.preventDefault()
    updateProfile({
      ...user,
      email: email,
      showEmail: showEmail
    })
  }

  const handleFacebookChange = async (event) => {
    event.preventDefault()
    await updateProfile({
      ...user,
      facebook: facebook,
      showFacebook: showFacebook
    })
  }

  const handleInstagramChange = async (event) => {
    event.preventDefault()
    await updateProfile({
      ...user,
      instagram: instagram,
      showInstagram: showInstagram
    })
  }

  const handleTwitterChange = async (event) => {
    event.preventDefault()
    await updateProfile({
      ...user,
      twitter: twitter,
      showTwitter: showTwitter
    })
  }

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
      <div>
        <Form onSubmit={handleEmailChange}>
          <Form.Label>Sähköpostiosoite:</Form.Label>
          <Form.Control
            type="text"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
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
        <Form onSubmit={handleFacebookChange}>
          <Form.Label>Facebook:</Form.Label>
          <Form.Control
            type="text"
            value={facebook}
            onChange={({ target }) => setFacebook(target.value)}
          />
          <FormCheck custom type="switch">
            <FormCheck.Input checked={showFacebook} onChange={() => setShowFacebook(!showFacebook)} />
            <FormCheck.Label onClick={() => setShowFacebook(!showFacebook)}>
              Näytä facebook muille käyttäjille
            </FormCheck.Label>
          </FormCheck>
          <div className='buttonWrapper'>
            <Button type="submit">päivitä facebook tai sen näkyvyys</Button>
          </div>
        </Form>
      </div>
      <div>
        <Form onSubmit={handleInstagramChange}>
          <Form.Label>Instagram:</Form.Label>
          <Form.Control
            type="text"
            value={instagram}
            onChange={({ target }) => setInstagram(target.value)}
          />
          <FormCheck custom type="switch">
            <FormCheck.Input checked={showInstagram} onChange={() => setShowInstagram(!showInstagram)} />
            <FormCheck.Label onClick={() => setShowInstagram(!showInstagram)}>
              Näytä instagram muille käyttäjille
            </FormCheck.Label>
          </FormCheck>
          <div className='buttonWrapper'>
            <Button type="submit">päivitä instagram tai sen näkyvyys</Button>
          </div>
        </Form>
      </div>
      <div>
        <Form onSubmit={handleTwitterChange}>
          <Form.Label>Twitter:</Form.Label>
          <Form.Control
            type="text"
            value={twitter}
            onChange={({ target }) => setTwitter(target.value)}
          />
          <FormCheck custom type="switch">
            <FormCheck.Input checked={showTwitter} onChange={() => setShowTwitter(!showTwitter)} />
            <FormCheck.Label onClick={() => setShowTwitter(!showTwitter)}>
              Näytä twitter muille käyttäjille
            </FormCheck.Label>
          </FormCheck>
          <div className='buttonWrapper'>
            <Button type="submit">päivitä twitter tai sen näkyvyys</Button>
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