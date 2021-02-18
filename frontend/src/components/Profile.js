import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'

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
      console.log('user in profilepage: ', user)
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
    const newUser = {
      ...user,
      description: description
    }
    console.log('new user: ', newUser)
    updateProfile(newUser)
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    const newUser = {
      ...user,
      name: name
    }
    console.log('new user: ', newUser)
    updateProfile(newUser)
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
    const newUser = {
      ...user,
      facebook: facebook,
      showFacebook: showFacebook
    }
    console.log('new user: ', newUser)
    await updateProfile(newUser)
  }

  const handleInstagramChange = async (event) => {
    event.preventDefault()
    const newUser = {
      ...user,
      instagram: instagram,
      showInstagram: showInstagram
    }
    console.log('new user: ', newUser)
    await updateProfile(newUser)
  }

  const handleTwitterChange = async (event) => {
    event.preventDefault()
    const newUser = {
      ...user,
      twitter: twitter,
      showTwitter: showTwitter
    }
    console.log('new user: ', newUser)
    await updateProfile(newUser)
  }

  const emailChanger = async () => {
    await setShowEmail(!showEmail)
    console.log('show email status: ', showEmail)
  }

  const facebookChanger = async () => {
    await setShowFacebook(!showFacebook)
  }

  const instagramChanger = async () => {
    await setShowInstagram(!showInstagram)
  }

  const twitterChanger = async () => {
    await setShowTwitter(!showTwitter)
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
          <Form.Check id="facebook-switch" type="switch" checked={showFacebook} onChange={facebookChanger} label='näytä facebook muille käyttäjille' />
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
          <Form.Check id="instagram-switch" type="switch" checked={showInstagram} onChange={instagramChanger} label='näytä instagram muille käyttäjille' />
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
          <Form.Check id="twitter-switch" type="switch" checked={showTwitter} onChange={twitterChanger} label='näytä twitter muille käyttäjille' />
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