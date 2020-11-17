import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const Profile = ({ user, addUserDescription, users }) => {
  const [description, setDescription] = useState(user.description)
  
  const handleDescriptionAdd = (event) => {
    event.preventDefault()
    //const userToUpdate = users.find(u => u.id === user.id)
    addUserDescription({
      ...user,
      description: description
    })
  }
  
  return (
    <div>
      <h2>{user.username}</h2>
      <Form onSubmit={handleDescriptionAdd}>
        <Form.Label>Kuvaus</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <Button type="submit">päivitä kuvaus</Button>
      </Form>
    </div>
  )
}

export default Profile