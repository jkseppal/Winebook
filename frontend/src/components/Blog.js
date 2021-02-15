import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Button, Modal } from 'react-bootstrap'
import Togglable from './Togglable'
import dompurify from 'dompurify'
import { Editor } from '@tinymce/tinymce-react'

const Blog = ({ blogs, addEntry, user, commentEntry, likeEntry, editorContent }) => {
  const [newEntryTitle, setNewEntryTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [show, setShow] = useState(false)
  const [showComment, setShowComment] = useState(false)
  const [comment, setComment] = useState('')
  const [index, setIndex] = useState(null)
  
  const id = useParams().id

  const sanitizer = dompurify.sanitize

  const handleEditorChange = (content, editor) => {
    setNewContent(content)
    console.log('content:', content)
  }

  const now = new Date()

  const blogToShow = blogs.find(b => b.id === id)

  let authorized = false
  if (blogToShow && user && blogToShow.user.id === user.id) {
    authorized = true
  }

  const handleEntryAdd = (event) => {
    event.preventDefault()
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
    let newComment = null
    if (!user) {
      newComment = {
        text: comment,
        user: 'vierailija',
        commentDate: now.toDateString()
      }
    } else {
      newComment = {
        text: comment,
        user: user.username,
        commentDate: now.toDateString()
      }
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

  const commentRef = useRef()

  const entryRef = useRef()

  const stripper = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    console.log('doc: ', doc)
    let part = doc.body.textContent || ''
    console.log('part: ', part)
    if (part.length > 200) {
      part = part.substr(0,200)
      part += '...'
    }
    return part
  }

  if (!blogToShow || !blogs) {
    return null
  }

  return (
    <div className='guide'>
      <h2>{blogToShow.title}</h2>
      Kirjoittaja: {blogToShow.user.username}
      {blogToShow.blogEntries && blogToShow.blogEntries.map(b =>
        <div key={b._id} className="blockWrapper">
          <div className="tableWrapper">
            <h3>{b.entryTitle}</h3>
            <i>{b.entryDate}</i><br />
            <Togglable id="full-view" shortString={stripper(b.entryContent)} buttonLabel='Näytä kokonaan' ref={entryRef}>
              <div dangerouslySetInnerHTML={{__html: sanitizer(b.entryContent)}} /><br />
              <i id="likes">Tykkäyksiä: {b.likes}</i><br />
              <div className="buttonWrapper">
                <Button id="like-button" onClick={(e) => handleLike(blogToShow.blogEntries.indexOf(b), e)}>Tykkää</Button><br />
              </div>
              <div className="buttonWrapper">
                <Button id="comment-form" variant="success" onClick={(e) => handleShowComment(blogToShow.blogEntries.indexOf(b), e)}>lisää kommentti</Button>
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
                      id="comment-field"
                      value={comment}
                      onChange={({ target }) => setComment(target.value)}
                    />
                    <Button id="add-comment" onClick={() => handleCommentAdd(index)}>lisää kommentti</Button>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseComment}>peruuta</Button>
                </Modal.Footer>
              </Modal>
              <Togglable id="show-comments" buttonLabel='näytä kommentit' ref={commentRef}>
                {b.comments && b.comments.map(c =>
                  <div key={b.comments.indexOf(c)}>
                    <p className="commentWrapper">
                      <b>{c.user}</b><br />
                      <i>{c.commentDate}</i><br />
                      {c.text}
                    </p>
                  </div>
                )}
              </Togglable>
            </Togglable>
          </div>
        </div>
      )}

      {authorized && <div>
        <div className="buttonWrapper">
          <Button id="add-entry-form" onClick={handleShow}>lisää blogimerkintä</Button>
        </div>
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Lisää uusi blogimerkintä</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEntryAdd}>
              <Form.Label>Otsikko:</Form.Label>
              <Form.Control
                type="text"
                id="entry-header"
                value={newEntryTitle}
                onChange={({ target }) => setNewEntryTitle(target.value)}
              />
              <Form.Label>Sisältö:</Form.Label>
              <Editor
                apiKey='of54cb492304vkn5fjxyqvan6ekih5gvviu2q05or7c7plw8'
                initialValue=""
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                  ],
                  toolbar:
                    'undo redo | fontselect fontsizeselect | bold italic underline forecolor backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help',
                }}
                onEditorChange={handleEditorChange}
              />
              <Button type="submit" id="add-entry">lisää</Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>peruuta</Button>
          </Modal.Footer>
        </Modal>
      </div>}
    </div>
  )
}

export default Blog