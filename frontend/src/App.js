import React, { useState, useEffect } from 'react'
import wineService from './services/wines'
import reviewService from './services/reviews'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import SingleWine from './components/SingleWine'
import WineList from './components/WineList'
import RegistrationForm from './components/RegistrationForm'
import Login from './components/Login'
import UserList from './components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import { createWine, initializeWines } from './reducers/wineReducer'
import WineForm from './components/WineForm'
import { initializeUsers, createUser } from './reducers/usersReducer'
import SingleUser from './components/SingleUser'
import { Navbar, Nav, Button } from 'react-bootstrap'

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
  }

  const addUser = (userObject) => {
    dispatch(createUser(userObject))
  }

  return (
    <Router>
      <div className="container">
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
        {/*<div>
          <Link to="/">etusivu</Link>
          {user ? <Link to="/create">lisää viini</Link> : null}
          {user ? <Link to="/users">käyttäjät</Link> : null}
          {!user ? <Link to="/registration">rekisteröidy</Link> : null}
          {!user ? <Link to="/login"><button type="button">kirjaudu sisään</button></Link> : null}
          {user ? <button onClick={handleLogout}>kirjaudu ulos</button> : null}
        </div>
        <div>
          {user ? <h3>{user.username} kirjautunut sisään</h3> : null}
        </div>*/}

        <Switch>
          <Route path="/wines/:id">
            <SingleWine wines={wines} user={user} />
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
    </Router>
  )
}

export default App;
