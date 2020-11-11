import React, { useState, useEffect } from 'react'
import wineService from './services/wines'
import reviewService from './services/reviews'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import SingleWine from './components/SingleWine'
import WineList from './components/WineList'
import RegistrationForm from './components/RegistrationForm'
import Login from './components/Login'
import UserList from './components/UserList'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { createWine, initializeWines } from './reducers/wineReducer'
import WineForm from './components/WineForm'
import { initializeUsers, createUser } from './reducers/usersReducer'
import { notificationChange } from './reducers/notificationReducer'
import SingleUser from './components/SingleUser'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { likeReview } from './reducers/reviewReducer'

const App = () => {
  const dispatch = useDispatch()
  
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(initializeWines())
  },[dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  },[dispatch])

  let wines = useSelector(state => state.wines)
  let users = useSelector(state => state.users)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      wineService.setToken(user.token)
      reviewService.setToken(user.token)
    }
  }, [])

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
    return false
  }

  const addWine = (wineObject) => {
    dispatch(createWine(wineObject))
    dispatch(notificationChange(`viini ${wineObject.name} lisätty`, 5))
  }

  const addUser = (userObject) => {
    dispatch(createUser(userObject))
    dispatch(notificationChange('rekisteröityminen onnistunut', 5))
  }

  const addLike = (reviewObject) => {
    dispatch(likeReview(reviewObject.id, reviewObject))
  }

  return (
    <Router>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link to={'/'}>etusivu</Link>
              </Nav.Link>
              {user ? <Nav.Link href="#" as="span">
                <Link to={'/create'}>lisää viini</Link>
              </Nav.Link> : null}
              {user ? <Nav.Link href="#" as="span">
                <Link to={'/users'}>käyttäjät</Link>
              </Nav.Link> : null}
              {!user ? <Nav.Link href="#" as="span">
                <Link to={'/registration'}>rekisteröidy käyttäjäksi</Link>
              </Nav.Link> : null}
              {!user ? <Nav.Link href="#" as="span">
                <Link to={'/login'}><Button type="button">kirjaudu sisään</Button></Link>
              </Nav.Link> : null}
              {user ? <Navbar.Brand>{user.username} kirjautunut sisään</Navbar.Brand> : null}
              {user ? <Button variant="secondary" onClick={handleLogout}>kirjaudu ulos</Button> : null}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
        <Notification />
        <Switch>
          <Route path="/wines/:id">
            <SingleWine wines={wines} user={user} addLike={addLike} />
          </Route>
          <Route path="/users/:id">
            <SingleUser users={users} />
          </Route>
          <Route path="/create">
            <WineForm addWine={addWine} user={user} />
          </Route>
          <Route path="/registration">
            <RegistrationForm addUser={addUser} />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/users">
            <UserList users={users} />
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
