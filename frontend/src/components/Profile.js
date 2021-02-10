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
    const newProfile = ({
      ...user,
      email: email,
      showEmail: showEmail
    })
    console.log('new profile from handler: ', newProfile)
    updateProfile(newProfile)
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

  const emailChanger = async () => {
    await setShowEmail(!showEmail)
    console.log('show email status: ', showEmail)
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
            id="name"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <div className='buttonWrapper'>
            <Button id="change-name" type="submit">vaihda nimi</Button>
          </div>
        </Form>
      </div>
      <div>
        <Form onSubmit={handleEmailChange}>
          <Form.Label>Sähköpostiosoite:</Form.Label>
          <Form.Control
            type="text"
            id="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <Form.Check id="email-switch" type="switch" checked={showEmail} onChange={emailChanger} label='näytä sähköpostiosoite muille käyttäjille' />
          <div className='buttonWrapper'>
            <Button id="update-email" type="submit">päivitä sähköpostiosoite tai sen näkyvyys</Button>
          </div>
        </Form>
      </div>
      <div>
        <Form onSubmit={handleFacebookChange}>
          <Form.Label>Facebook:</Form.Label>
          <Form.Control
            type="text"
            id="facebook"
            value={facebook}
            onChange={({ target }) => setFacebook(target.value)}
          />
          <FormCheck id="facebook-switch" custom type="switch">
            <FormCheck.Input checked={showFacebook} onChange={() => setShowFacebook(!showFacebook)} />
            <FormCheck.Label onClick={() => setShowFacebook(!showFacebook)}>
              Näytä facebook muille käyttäjille
            </FormCheck.Label>
          </FormCheck>
          <div className='buttonWrapper'>
            <Button id="update-facebook" type="submit">päivitä facebook tai sen näkyvyys</Button>
          </div>
        </Form>
      </div>
      <div>
        <Form onSubmit={handleInstagramChange}>
          <Form.Label>Instagram:</Form.Label>
          <Form.Control
            type="text"
            id="instagram"
            value={instagram}
            onChange={({ target }) => setInstagram(target.value)}
          />
          <FormCheck id="instagram-switch" custom type="switch">
            <FormCheck.Input checked={showInstagram} onChange={() => setShowInstagram(!showInstagram)} />
            <FormCheck.Label onClick={() => setShowInstagram(!showInstagram)}>
              Näytä instagram muille käyttäjille
            </FormCheck.Label>
          </FormCheck>
          <div className='buttonWrapper'>
            <Button id="update-instagram" type="submit">päivitä instagram tai sen näkyvyys</Button>
          </div>
        </Form>
      </div>
      <div>
        <Form onSubmit={handleTwitterChange}>
          <Form.Label>Twitter:</Form.Label>
          <Form.Control
            type="text"
            id="twitter"
            value={twitter}
            onChange={({ target }) => setTwitter(target.value)}
          />
          <FormCheck id="twitter-switch" custom type="switch">
            <FormCheck.Input checked={showTwitter} onChange={() => setShowTwitter(!showTwitter)} />
            <FormCheck.Label onClick={() => setShowTwitter(!showTwitter)}>
              Näytä twitter muille käyttäjille
            </FormCheck.Label>
          </FormCheck>
          <div className='buttonWrapper'>
            <Button id="update-twitter" type="submit">päivitä twitter tai sen näkyvyys</Button>
          </div>
        </Form>
      </div>
      <div>
        <Form onSubmit={handleDescriptionAdd}>
          <Form.Label>Kuvaus:</Form.Label>
          <Form.Control
            as="textarea"
            id="description"
            rows={4}
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <div className='buttonWrapper'>
            <Button id="add-description" type="submit">päivitä kuvaus</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Profile