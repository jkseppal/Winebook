import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button, Modal } from 'react-bootstrap'
//import ModalHeader from 'react-bootstrap/esm/ModalHeader'

const Blog = ({ blogs, addEntry, user, commentEntry, likeEntry }) => {
  const [newEntryTitle, setNewEntryTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [show, setShow] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState('')
  const [index, setIndex] = useState(null)
  
  const id = useParams().id

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
    console.log('updated blog before addEntry: ', blogToUpdate)
    addEntry(id, blogToUpdate)
    setNewEntryTitle('')
    setNewContent('')
    setShow(false)
    console.log('updated blog at the last line of event handler: ', blogToShow)
  }

  const handleCommentAdd = (i) => {
    const newComment = {
      text: comment,
      user: user.username,
      commentDate: now.toDateString()
    }

    let entry = blogToShow.blogEntries[i]
    entry.comments.push(newComment)

    const blogToUpdate = {
      ...blogToShow,
      user: blogToShow.user.id,
    }
    console.log('index: ', i)
    commentEntry(id, blogToUpdate, i)
    setComment('')
    setShowComment(false)
  }

  const handleLike = (i, e) => {
    e.preventDefault()
    let entry = blogToShow.blogEntries[i]
    entry = {
      ...entry,
      likes: entry.likes + 1
    }
    let entries = [...blogToShow.blogEntries]
    entries[i] = entry
    console.log('entry after like: ', entry)

    const blogToUpdate = {
      ...blogToShow,
      blogEntries: entries,
      user: blogToShow.user.id
    }
    console.log('blog after like: ', blogToUpdate)
    likeEntry(id, blogToUpdate)
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const handleCloseComment = () => {
    setShowComment(false)
    setIndex(null)
  }
  const handleShowComment = (i, e) => {
    e.preventDefault()
    setIndex(i)
    setShowComment(true)
    console.log('modal opened, index: ', i)
  }

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
          {b.entryContent}<br />
          <i>Tykkäyksiä: {b.likes}</i><br />
          <div className="wrapper">
          <Button onClick={(e) => handleLike(blogToShow.blogEntries.indexOf(b), e)}>Tykkää</Button><br />
          </div>
          {console.log('entry: ', b, ', indeksi: ', blogToShow.blogEntries.indexOf(b))}
          <div className="wrapper">
          <Button variant="success" onClick={(e) => handleShowComment(blogToShow.blogEntries.indexOf(b), e)}>lisää kommentti</Button>
          </div>
          <Modal size="lg" show={showComment} onHide={handleCloseComment}>
            <Modal.Header closeButton>
              <Modal.Title>Lisää kommentti</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Label>Kommentti</Form.Label>
                <Form.Control
                  type="text"
                  value={comment}
                  onChange={({ target }) => setComment(target.value)}
                />
                {/*<Button onClick={() => handleCommentAdd(blogToShow.blogEntries.indexOf(b))}>lisää kommentti</Button>*/}
                <Button onClick={() => handleCommentAdd(index)}>lisää kommentti</Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseComment}>peruuta</Button>
            </Modal.Footer>
          </Modal>
          {b.comments && b.comments.map(c =>
            <div key={b.comments.indexOf(c)}>
              {console.log('kommentti: ', c)}
              <b>{c.user}</b><br />
              <i>{c.commentDate}</i><br />
              {c.text}
            </div>
          )}
        </div>
      )}

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