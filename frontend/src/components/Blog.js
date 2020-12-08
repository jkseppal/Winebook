import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button, Modal } from 'react-bootstrap'

const Blog = ({ blogs, addEntry, user, commentEntry }) => {
  const [newEntryTitle, setNewEntryTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [show, setShow] = useState(false)
  const [comment, setComment] = useState('')
  
  const id = useParams().id
  //console.log('id: ', id)

  const now = new Date()

  const blogToShow = blogs.find(b => b.id === id)
  //console.log('entries: ', blogToShow.blogEntries)
  //console.log('entry title: ', blogToShow.blogEntries[0].entryTitle)

  let authorized = false
  if (blogToShow && user && blogToShow.user.id === user.id) {
    authorized = true
  }

  const handleEntryAdd = (event) => {
    const newEntry = {
      entryTitle: newEntryTitle,
      entryContent: newContent,
      entryDate: now.toDateString(),
      likes: 0
    }
    const entries = blogToShow.blogEntries.concat(newEntry)
    const blogToUpdate = {
      title: blogToShow.title,
      user: blogToShow.user.id,
      blogEntries: entries
    }
    console.log('entry: ', blogToUpdate)
    addEntry(id, blogToUpdate)
    setNewEntryTitle('')
    setNewContent('')
    setShow(false)
  }

  //Entryt eivät ole omia dokumentteja, mieti parempi tapa!!!
  //Nyt PUT-pyyntö ei korvaa entryä
  const handleCommentAdd = (index) => {
    const newComment = {
      text: comment,
      user: user.username,
      commentDate: now.toDateString()
    }

    let entry = blogToShow.blogEntries[index]
    entry.comments.push(newComment)

    const blogToUpdate = {
      ...blogToShow,
      user: blogToShow.user.id,
      /*blogEntries: [
        ...blogToShow.blogEntries
      ]*/
    }
    commentEntry(id, blogToUpdate, index)
    setComment('')
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  /*const EntryForm = () => {
    if (authorized === false) {
      return null
    }
    return (
      <div>
        <h3>Lisää uusi blogimerkintä:</h3>
        <Form onSubmit={handleEntryAdd}>
          <Form.Label>Otsikko:</Form.Label>
          <Form.Control
            type="text"
            value={newEntryTitle}
            onChange={({ target }) => setNewEntryTitle(target.value)}
          />
          <Form.Label>Sisältö:</Form.Label>
          <Form.Control
            type="text"
            value={newContent}
            onChange={({ target }) => setNewContent(target.value)}
          />
          <Button type="submit">lisää</Button>
        </Form>
      </div>
    )
  }*/

  if (!blogToShow || !blogs || !user) {
    return null
  }

  return (
    <div>
      <h2>{blogToShow.title}</h2>
      Kirjoittaja: {blogToShow.user.username}
      {blogToShow.blogEntries && blogToShow.blogEntries.map(b =>
        <div key={b._id}>
          <h3>{b.entryTitle}</h3>
          <i>{b.entryDate}</i><br />
          {b.entryContent}
          {/*<Form onSubmit={handleCommentAdd(blogToShow.blogEntries.indexOf(b))}>*/}
          <Form>
            <Form.Label>Lisää kommentti</Form.Label>
            <Form.Control
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            {/*<Button type="submit">lisää</Button>*/}
            <Button onClick={() => handleCommentAdd(blogToShow.blogEntries.indexOf(b))}>lisää kommentti</Button>
          </Form>
          {b.comments && b.comments.map(c =>
            <div key={b.comments.indexOf(c)}>
              <b>{c.user}</b><br />
              <i>{c.commentDate}</i><br />
              {c.text}
            </div>
          )}
        </div>
      )}
      {/*authorized && <div>
        <h3>Lisää uusi blogimerkintä:</h3>
        <Form onSubmit={handleEntryAdd}>
          <Form.Label>Otsikko:</Form.Label>
          <Form.Control
            type="text"
            value={newEntryTitle}
            onChange={({ target }) => setNewEntryTitle(target.value)}
          />
          <Form.Label>Sisältö:</Form.Label>
          <Form.Control
            type="text"
            value={newContent}
            onChange={({ target }) => setNewContent(target.value)}
          />
          <Button type="submit">lisää</Button>
        </Form>
      </div>*/}
      {authorized && <div>
        <Button onClick={handleShow}>lisää blogimerkintä</Button>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Lisää uusi blogimerkintä</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEntryAdd}>
              <Form.Label>Otsikko:</Form.Label>
              <Form.Control
                type="text"
                value={newEntryTitle}
                onChange={({ target }) => setNewEntryTitle(target.value)}
              />
              <Form.Label>Sisältö:</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                value={newContent}
                onChange={({ target }) => setNewContent(target.value)}
              />
              <Button type="submit">lisää</Button>
            </Form>
            {/*<input
              type="text"
              label='otsikko:'
              value={newEntryTitle}
              onChange={({ target }) => setNewEntryTitle(target.value)}
            />
            <input
              type="text"
              label='sisältö:'
              value={newContent}
              onChange={({ target }) => setNewContent(target.value)}
            />*/}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>peruuta</Button>
          </Modal.Footer>
        </Modal>
        {/*<Form onSubmit={handleEntryAdd}>
          <Form.Label>Otsikko:</Form.Label>
          <Form.Control
            type="text"
            value={newEntryTitle}
            onChange={({ target }) => setNewEntryTitle(target.value)}
          />
          <Form.Label>Sisältö:</Form.Label>
          <Form.Control
            type="text"
            value={newContent}
            onChange={({ target }) => setNewContent(target.value)}
          />
          <Button type="submit">lisää</Button>
          </Form>*/}
      </div>}
    </div>
  )
}

export default Blog