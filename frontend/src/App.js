import React, { useState, useEffect } from 'react'
import wineService from './services/wines'
import reviewService from './services/reviews'
import userService from './services/users'
import blogService from './services/blogs'
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom'
import SingleWine from './components/SingleWine'
import WineList from './components/WineList'
import RegistrationForm from './components/RegistrationForm'
import Login from './components/Login'
import ErrorMessage from './components/ErrorMessage'
import UserList from './components/UserList'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { createWine, initializeWines } from './reducers/wineReducer'
import WineForm from './components/WineForm'
import { initializeUsers, createUser, updateUser } from './reducers/usersReducer'
import { notificationChange } from './reducers/notificationReducer'
import SingleUser from './components/SingleUser'
import Guide from './components/Guide'
import Profile from './components/Profile'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { initializeReviews, likeReview, createReview } from './reducers/reviewReducer'
import { errorMessageChange } from './reducers/errorReducer'
import { initializeBlogs, addBlogEntry, addComment, addEntryLike } from './reducers/blogReducer'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()

  const [user, setUser] = useState(null)
  const [userFromDB, setUserFromDB] = useState(null)

  useEffect(() => {
    dispatch(initializeWines())
  },[dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  },[dispatch])

  useEffect(() => {
    dispatch(initializeReviews())
  },[dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  let wines = useSelector(state => state.wines)
  let users = useSelector(state => state.users)
  let reviews = useSelector(state => state.reviews)
  let blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log('logged user: ', user)
      wineService.setToken(user.token)
      reviewService.setToken(user.token)
      userService.setToken(user.token)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      let loggedUser = users.find(u => u.username === user.username)
      console.log('user from db: ', loggedUser)
      setUserFromDB(loggedUser)
    }
  }, [user, users])

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    dispatch(notificationChange('Olet kirjautunut ulos sovelluksesta', 5))
    window.location.assign('/')
    return false
  }

  const addWine = async (wineObject) => {
    try {
      await dispatch(createWine(wineObject))
      await dispatch(initializeUsers())
      dispatch(notificationChange(`viini ${wineObject.name} lisätty`, 5))
    } catch (exception) {
      dispatch(errorMessageChange('viinin lisääminen epäonnistui', 5))
    }
  }

  const addUser = async (userObject) => {
    try {
      const newUser = await userService.createUser(userObject)
      dispatch(createUser(newUser))
      dispatch(notificationChange('Rekisteröityminen onnistunut!', 5))
      const credentials = {
        username: userObject.username,
        password: userObject.password
      }
      const registeredUser = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(registeredUser)
      )
      window.location.assign('/')
    } catch (exception) {
      dispatch(errorMessageChange('Rekisteröityminen epäonnistui!', 5))
    }
  }

  const passwordUpdate = async (userObject, password) => {
    try {
      const id = userObject.id
      console.log('id: ', id)
      const username = userObject.username
      await loginService.login({ username, password })
      await userService.updatePassword(id, userObject)
      dispatch(notificationChange('salasana päivitetty', 5))
    } catch (exception) {
      dispatch(errorMessageChange('Salasanan päivitys epäonnistui, tarkasta vanha salasana!', 5))
    }
  }

  const updateProfile = async (userObject) => {
    try {
      dispatch(updateUser(userFromDB.id, userObject))
      dispatch(notificationChange('profiili päivitetty', 5))
    } catch (exception) {
      dispatch(errorMessageChange('päivitys epäonnistui', 5))
    }
  }

  const addReview = async (id, reviewObject) => {
    try {
      await dispatch(createReview(id, reviewObject))
      await dispatch(initializeUsers())
      await dispatch(initializeWines())
      dispatch(notificationChange('Arvostelu lisätty', 5))
    } catch (exception) {
      dispatch(errorMessageChange('arvostelun lisääminen epäonnistui', 5))
    }
  }

  const addLike = (reviewObject) => {
    dispatch(likeReview(reviewObject.id, reviewObject))
  }

  const addEntry = (id, entryObject) => {
    dispatch(addBlogEntry(id, entryObject))
    console.log('updated state of blogs: ', blogs)
  }

  const commentEntry = (id, commentObject, index) => {
    dispatch(addComment(id, commentObject, index))
  }

  const likeEntry = (id, entryObject) => {
    dispatch(addEntryLike(id, entryObject))
  }

  const countryList = [
    'muu',
    'Ranska',
    'Italia',
    'Espanja',
    'Saksa',
    'Portugali',
    'Chile',
    'Australia',
    'Argentina',
    'Etelä-Afrikka',
    'Uusi-Seelanti',
    'Itävalta',
    'Yhdysvallat',
    'Unkari',
    'Kreikka'
  ]

  const typeList = [
    'punaviini',
    'valkoviini',
    'roseeviini',
    'kuohuviini',
    'maustettu viini',
    'väkevä viini',
    'jälkiruokaviini',
    'muu'
  ]

  const NavBarLink = (props) => {
    return (
      <Nav.Link href="#" as="span">
        <Link to={props.path}>{props.text}</Link>
      </Nav.Link>
    )
  }

  return (
    <Router>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <NavBarLink path='/' text='etusivu' />
              {user && <NavBarLink path='/create' text='lisää viini' id="nav-add-wine" />}
              {user && <NavBarLink path='/users' text='käyttäjät' />}
              {!user && <NavBarLink path='/registration' text='rekisteröidy käyttäjäksi' />}
              <NavBarLink path='/guide' text='ohjeita' />
              <NavBarLink path='/blogs' text='blogit' />
              {userFromDB && <NavBarLink path='/profile' text='oma profiili' />}
              {!user && <NavBarLink path='/login' text={<Button variant="success" type="button">kirjaudu sisään</Button>} />}
              {user && <Navbar.Brand>{user.username} kirjautunut sisään</Navbar.Brand>}
              {user && <Button variant="outline-secondary" onClick={handleLogout}>kirjaudu ulos</Button>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          <Notification />
          <ErrorMessage />
          <Switch>
            <Route path="/wines/:id">
              <SingleWine wines={wines} user={userFromDB} reviews={reviews} addLike={addLike} addReview={addReview} updateProfile={updateProfile} />
            </Route>
            <Route path="/users/:id">
              <SingleUser user={user} users={users} reviews={reviews} blogs={blogs} />
            </Route>
            <Route path="/create">
              <WineForm addWine={addWine} user={user} wines={wines} countryList={countryList} typeList={typeList} />
            </Route>
            <Route path="/registration">
              <RegistrationForm addUser={addUser} users={users} />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/users">
              <UserList user={user} users={users} />
            </Route>
            <Route path="/guide">
              <Guide />
            </Route>
            <Route path="/profile">
              <Profile user={userFromDB} updateProfile={updateProfile} updatePassword={passwordUpdate} />
            </Route>
            <Route path="/blogs/:id">
              <Blog blogs={blogs} addEntry={addEntry} user={userFromDB} commentEntry={commentEntry} likeEntry={likeEntry} />
            </Route>
            <Route path="/blogs">
              <BlogList blogs={blogs} user={userFromDB} updateProfile={updateProfile} />
            </Route>
            <Route path="/">
              <WineList wines={wines} countryList={countryList} typeList={typeList} />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App
