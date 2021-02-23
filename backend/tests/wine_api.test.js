const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
//const testingRouter = require('../controllers/testing')
const Blog = require('../models/blog')
const Review = require('../models/review')
const User = require('../models/user')
const Wine = require('../models/wine')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Review.deleteMany({})
  await User.deleteMany({})
  await Wine.deleteMany({})

  let userObject = new User(helper.initialUsers[0])
  await userObject.save()

  userObject = new User(helper.initialUsers[1])
  await userObject.save()
})

test('users are returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('right number of users are returned', async () => {
  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(2)
})

test('a wine can only be added with token', async () => {
  const newWine = {
    name: 'uusi viini',
    type: 'punaviini'
  }
  const newUser = {
    name: 'testaaja3',
    username: 'testaaja3',
    email: 'testaaja3@gmail.com',
    password: 'password3'
  }

  await api
    .post('/api/wines')
    .send(newWine)
    .expect(401)

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

  const response = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)

  const token = response.body.token

  await api
    .post('/api/wines')
    .set('Authorization', `bearer ${token}`)
    .send(newWine)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDB()
  console.log('test users at end: ', usersAtEnd)
  expect(usersAtEnd).toHaveLength(3)

  const winesAtEnd = await helper.winesInDB()
  expect(winesAtEnd).toHaveLength(1)
})

test('a blog can only be added with token', async () => {
  const newBlog = {
    title: 'testiblogi'
  }
  const newUser = {
    name: 'testaaja3',
    username: 'testaaja3',
    email: 'testaaja3@gmail.com',
    password: 'password3'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

  const response = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)

  const token = response.body.token

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDB()
  expect(blogsAtEnd).toHaveLength(1)
})

test('a review can only be added with token', async () => {
  const newWine = {
    name: 'uusi viini',
    type: 'punaviini'
  }
  const newUser = {
    name: 'testaaja3',
    username: 'testaaja3',
    email: 'testaaja3@gmail.com',
    password: 'password3'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

  const response = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)

  const token = response.body.token

  await api
    .post('/api/wines')
    .set('Authorization', `bearer ${token}`)
    .send(newWine)
    .expect(200)

  const rawWines = await api
    .get('/api/wines')

  const wines = rawWines.body
  expect(wines).toHaveLength(1)

  const newReview = {
    vintage: '1990',
    points: '50',
    description: 'testiarvostelu'
  }

  await api
    .post(`/api/reviews/${wines[0].id}`)
    .send(newReview)
    .expect(401)

  await api
    .post(`/api/reviews/${wines[0].id}`)
    .set('Authorization', `bearer ${token}`)
    .send(newReview)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const reviewsAtEnd = await helper.reviewsInDB()
  expect(reviewsAtEnd).toHaveLength(1)
})

test('a blog entry can be added', async () => {
  const newBlog = {
    title: 'testiblogi'
  }
  const newUser = {
    name: 'testaaja3',
    username: 'testaaja3',
    email: 'testaaja3@gmail.com',
    password: 'password3'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

  const response = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)

  const token = response.body.token

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)

  const blogResponse = await api
    .get('/api/blogs')

  const blog = blogResponse.body

  const date = new Date()

  const newEntry = {
    entryTitle: 'Title',
    entryContent: 'Content',
    entryDate: date.toDateString(),
    likes: 0,
    comments: []
  }

  const blogToUpdate = {
    ...blog[0],
    user: blog[0].user.id,
    blogEntries: [newEntry]
  }

  await api
    .put(`/api/blogs/${blog[0].id}`)
    .send(blogToUpdate)
    .expect(200)
})

test('a blog entry can be commented', async () => {
  const newBlog = {
    title: 'testiblogi'
  }
  const newUser = {
    name: 'testaaja3',
    username: 'testaaja3',
    email: 'testaaja3@gmail.com',
    password: 'password3'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

  const response = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)

  const token = response.body.token

  await api
    .post('/api/blogs')
    .set('Authorization', `bearer ${token}`)
    .send(newBlog)
    .expect(200)

  let blogResponse = await api
    .get('/api/blogs')

  let blog = blogResponse.body

  const date = new Date()

  const newEntry = {
    entryTitle: 'Title',
    entryContent: 'Content',
    entryDate: date.toDateString(),
    likes: 0,
    comments: []
  }

  const blogToUpdate = {
    ...blog[0],
    user: blog[0].user.id,
    blogEntries: [newEntry]
  }

  await api
    .put(`/api/blogs/${blog[0].id}`)
    .send(blogToUpdate)
    .expect(200)

  const newComment = {
    user: newUser.username,
    text: 'text',
    commentDate: date.toDateString()
  }

  blogResponse = await api
    .get('/api/blogs')

  blog = blogResponse.body

  const blogWithComment = {
    ...blog[0],
    user: blog[0].user.id,
    blogEntries: [
      blog[0].blogEntries[0] = {
        ...blog[0].blogEntries[0],
        comments: [newComment]
      }
    ]
  }

  const newResponse = await api
    .put(`/api/blogs/${blog[0].id}`)
    .send(blogWithComment)
    .expect(200)
  
  expect(newResponse.body.blogEntries[0].comments).toHaveLength(1)
})

test('profile can only be updated with token', async () => {
  const newUser = {
    name: 'testaaja3',
    username: 'testaaja3',
    email: 'testaaja3@gmail.com',
    password: 'password3'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)

  const response = await api
    .post('/api/login')
    .send(newUser)
    .expect(200)

  const token = response.body.token

  const usersResponse = await api
    .get('/api/users')
    .expect(200)

  const userFromDB = usersResponse.body[2]

  const profileToUpdate = {
    ...userFromDB,
    facebook: 'http://facebook.com/testaaja3',
    instagram: 'http://instagram.com/testaaja3',
    twitter: 'http://twitter.com/testaaja3'
  }

  await api
    .put(`/api/users/${userFromDB.id}`)
    .send(profileToUpdate)
    .expect(401)

  const putResponse = await api
    .put(`/api/users/${userFromDB.id}`)
    .set('Authorization', `bearer ${token}`)
    .send(profileToUpdate)
    .expect(200)

  expect(putResponse.body).toHaveProperty('facebook', 'http://facebook.com/testaaja3')
  expect(putResponse.body).toHaveProperty('instagram', 'http://instagram.com/testaaja3')
  expect(putResponse.body).toHaveProperty('twitter', 'http://twitter.com/testaaja3')
})

afterAll(() => {
  mongoose.connection.close()
})