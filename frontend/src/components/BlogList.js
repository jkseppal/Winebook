import React, { useState, useEffect } from 'react'
import { Table, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, initializeBlogs } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'

const BlogList = (user) => {
  const dispatch = useDispatch()
  console.log('user in bloglist: ', user)
  
  const [title, setTitle] = useState('')

  let authorized = false
  //prop user tulee jostain syystä virheellisesti, toiminto korjattu käyttämällä arvoa user.user
  if (user.user) {
    authorized = true
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  let blogs = useSelector(state => state.blogs)

  const addBlog = async (blogObject) => {
    await dispatch(createBlog(blogObject))
    dispatch(initializeUsers())
    console.log('new blog: ', blogObject)
  }

  const handleBlogAdd = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title
    }
    addBlog(newBlog)
    setTitle('')
  }
  
  if (!blogs) {
    return null
  }
  return (
    <div className='guide'>
      <h2>Käyttäjien blogit</h2>
      <Table striped className='tableWrapper'>
        <thead>
          <tr>
            <td>blogi</td>
            <td>käyttäjä</td>
          </tr>
        </thead>
        <tbody>
          {blogs.map(b =>
            <tr key={b.id}>
              <td><Link to={`blogs/${b.id}`}>{b.title}</Link></td>
              <td>{b.user.username}</td>
            </tr>
          )}
        </tbody>
      </Table>
      {authorized && <div>
        <h2>Lisää blogi:</h2>
        <Form onSubmit={handleBlogAdd}>
          <Form.Label>Otsikko:</Form.Label>
          <Form.Control
            type="text"
            id="blog-field"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Button type="submit" id="add-blog">lisää</Button>
        </Form>
      </div>}
    </div>
  )
}

export default BlogList