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
  const [nameFilter, setNameFilter] = useState('')
  const [blogFilter, setBlogFilter] = useState('')

  let authorized = false
  //prop user tulee jostain syystä virheellisesti, toiminto korjattu käyttämällä arvoa user.user
  if (user.user) {
    authorized = true
  }

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  let blogs = useSelector(state => state.blogs)

  let blogsToShow = blogs.filter(b => b.title.toLowerCase().includes(blogFilter.toLowerCase()))
  blogsToShow = blogsToShow.filter(b => b.user.username.toLowerCase().includes(nameFilter.toLowerCase()))

  const handleBlogFilterChange = (event) => {
    setBlogFilter(event.target.value)
  }

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value)
  }

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

  const latestEntry = (entries) => {
    if (entries.length > 0) {
      return entries[entries.length - 1].entryDate
    }
    return null
  }

  const linkCheck = (user) => {
    if (authorized) {
      return (
        <Link to={`users/${user.id}`}>{user.username}</Link>
      )
    }
    return user.username
  }

  if (!blogs) {
    return null
  }
  return (
    <div className="guide">
      <h2>Käyttäjien blogit</h2>
      <div className="blockWrapper">
        <table>
          <tbody>
            <tr>
              <td className="padding50right">Hae blogin otsikon perusteella:</td>
              <td className="padding50right">Hae kirjoittajan perusteella</td>
            </tr>
            <tr>
              <td className="padding50right">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="hae..."
                  value={blogFilter}
                  onChange={handleBlogFilterChange}
                />
              </td>
              <td className="padding50right">
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="hae..."
                  value={nameFilter}
                  onChange={handleNameFilterChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/*<div className="buttonWrapper">
      Hae blogin otsikon perusteella:
        <input
          placeholder="hae..."
          value={blogFilter}
          onChange={handleBlogFilterChange}
        />

      Hae kirjoittajan perusteella:
        <input
          placeholder="hae..."
          value={nameFilter}
          onChange={handleNameFilterChange}
        />
  </div>*/}
      <Table striped className='tableWrapper'>
        <thead>
          <tr>
            <td>blogi</td>
            <td>käyttäjä</td>
            <td>merkintöjä</td>
            <td>viimeisin merkintä</td>
          </tr>
        </thead>
        <tbody>
          {blogsToShow.map(b =>
            <tr key={b.id}>
              <td><Link to={`blogs/${b.id}`}>{b.title}</Link></td>
              <td>{linkCheck(b.user)}</td>
              <td>{b.blogEntries.length}</td>
              <td>{latestEntry(b.blogEntries)}</td>
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
          <div className="buttonWrapper">
            <Button type="submit" id="add-blog">lisää</Button>
          </div>
        </Form>
      </div>}
    </div>
  )
}

export default BlogList