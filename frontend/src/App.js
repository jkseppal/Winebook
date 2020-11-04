import React, { useState, useEffect } from 'react'
import loginService from './services/login'
import userService from './services/users'
import wineService from './services/wines'
import reviewService from './services/reviews'
import Wine from './components/Wine'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import SingleWine from './components/SingleWine'
import WineList from './components/WineList'
import RegistrationForm from './components/RegistrationForm'
import Login from './components/Login'

const App = () => {
  const [wines, setWines] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [wineName, setWineName] = useState('')
  const [region, setRegion] = useState('')
  const [grapes, setGrapes] = useState('')
  const [users, setUsers] = useState([])
  /*const [newName, setNewName] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')*/

  useEffect(() => {
    wineService.getWines().then(wines =>
      setWines( wines )
      )
  }, [])

  useEffect(() => {
    userService.getUsers().then(users =>
      setUsers( users )
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      wineService.setToken(user.token)
      reviewService.setToken(user.token)
    }
  }, [])

  /*const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      wineService.setToken(user.token)
      reviewService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('invalid username or password')
    }
  }*/

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
    return false
  }

  const handleWineAdd = (event) => {
    addWine({
      user: user,
      name: wineName,
      region: region,
      grapes: grapes
    })
    setWineName('')
    setRegion('')
    setGrapes('')
  }

  const addWine = (wineObject) => {
    wineService
      .addWine(wineObject)
      .then(returnedWine => {
        setWines(wines.concat(returnedWine))
      })
  }

  /*const handleUserAdd = (event) => {
    event.preventDefault()
    addUser({
      name: newName,
      username: newUsername,
      password: newPassword
    })
    setNewName('')
    setNewUsername('')
    setNewPassword('')
  }

  const addUser = (userObject) => {
    userService
      .createUser(userObject)
      .then(returnedUser => {
        setUsers(users.concat(returnedUser))
      })
  }*/

  /*if (user === null) {
    return (
      <div>
        <h2>log in to wine application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
        {/*<div>
          <h2>Rekisteröidy käyttäjäksi</h2>
          <form onSubmit={handleUserAdd}>
            <div>
              name
              <input
                type="text"
                value={newName}
                onChange={({ target }) => setNewName(target.value)}
              />
            </div>
            <div>
              username
              <input
                type="text"
                value={newUsername}
                onChange={({ target }) => setNewUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                type="password"
                value={newPassword}
                onChange={({ target }) => setNewPassword(target.value)}
              />
            </div>
            <button type="submit">rekisteröidy</button>
          </form>
        </div>
      </div>
    )
  }*/
  return (
    <Router>
      <div>
        <div>
          <Link to="/">home</Link>
          <Link to="/registration">rekisteröidy</Link>
          <Link to="/login">kirjaudu sisään</Link>
          <button onClick={handleLogout}>kirjaudu ulos</button>
        </div>

        <Switch>
          <Route path="/wines/:id">
            <SingleWine wines={wines} user={user} />
          </Route>
          <Route path="/registration">
            <RegistrationForm />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <WineList wines={wines} />
          </Route>
        </Switch>
      </div>
    </Router>
    /*<div>
      <h2>{user.name} logged in</h2>
      <button onClick={handleLogout}>logout</button>
      <div>
        <h3>add wine:</h3>
        <form onSubmit={handleWineAdd}>
          <div>
            name
            <input
              type="text"
              value={wineName}
              onChange={({ target }) => setWineName(target.value)}
            />
          </div>
          <div>
            region
            <input
              type="text"
              value={region}
              onChange={({ target }) => setRegion(target.value)}
            />
          </div>
          <div>
            grapes
            <input
              type="text"
              value={grapes}
              onChange={({ target }) => setGrapes(target.value)}
            />
          </div>
          <button type="submit">add wine</button>
        </form>
      </div>
      <div>
        <h3>wines</h3>
        {wines.map(wine =>
          <div key={wine.id}>
            name: {wine.name}<br />
            added by: {wine.user.username}<br />
            add a review: <br />
            
          </div>
        )}
        </div>
        {wines.map(wine =>
          <Wine key={wine.id} wine={wine} user={user} />
        )}
    </div>*/
  )
}

export default App;
