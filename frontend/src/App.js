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
import { initializeReviews, likeReview } from './reducers/reviewReducer'
import { errorMessageChange } from './reducers/errorReducer'
import { initializeBlogs } from './reducers/blogReducer'

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

  /*useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])*/

  let wines = useSelector(state => state.wines)
  let users = useSelector(state => state.users)
  let reviews = useSelector(state => state.reviews)
  /*let blogs = useSelector(state => state.blogs)
  console.log('blogs: ', blogs)*/

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

  const addWine = (wineObject) => {
    dispatch(createWine(wineObject))
    dispatch(notificationChange(`viini ${wineObject.name} lisätty`, 5))
  }

  const addUser = async (userObject) => {
    try {
      const newUser = await userService.createUser(userObject)
      dispatch(createUser(newUser))
      dispatch(notificationChange('Rekisteröityminen onnistunut!', 5))
    } catch (exception) {
      dispatch(errorMessageChange('Rekisteröityminen epäonnistui!', 5))
    }
  }

  const updateProfile = async (userObject) => {
    try {
      const updatedUser = await userService.updateUser(userFromDB.id, userObject)
      setUserFromDB(updatedUser)
      dispatch(updateUser(updatedUser))
      dispatch(notificationChange('profiili päivitetty', 5))
    } catch (exception) {
      dispatch(errorMessageChange('päivitys epäonnistui', 5))
    }
  }

  const addLike = (reviewObject) => {
    dispatch(likeReview(reviewObject.id, reviewObject))
  }

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
              {user && <NavBarLink path='/create' text='lisää viini' />}
              {user && <NavBarLink path='/users' text='käyttäjät' />}
              {!user && <NavBarLink path='/registration' text='rekisteröidy käyttäjäksi' />} 
              <NavBarLink path='/guide' text='ohjeita' />
              {user && <NavBarLink path='/blogs' text='blogit' />}
              {userFromDB && <NavBarLink path='/profile' text='oma profiili' />}
              {!user && <NavBarLink path='/login' text={<Button type="button">kirjaudu sisään</Button>} />}
              {user && <Navbar.Brand>{user.username} kirjautunut sisään</Navbar.Brand>}
              {user && <Button variant="secondary" onClick={handleLogout}>kirjaudu ulos</Button>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
        <Notification />
        <ErrorMessage />
        <Switch>
          <Route path="/wines/:id">
            <SingleWine wines={wines} user={user} reviews={reviews} addLike={addLike} />
          </Route>
          <Route path="/users/:id">
            <SingleUser user={user} users={users}/>
          </Route>
          <Route path="/create">
            <WineForm addWine={addWine} user={user} wines={wines} />
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
            <Profile user={userFromDB} updateProfile={updateProfile} />
          </Route>
          <Route path="/blogs">
            <BlogList />
          </Route>
          <Route path="/">
            <WineList wines={wines} />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>
  )
}

export default App;
