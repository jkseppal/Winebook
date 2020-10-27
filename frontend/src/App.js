import React, { useState, useEffect } from 'react'
import loginService from './services/login'
//import userService from './services/users'
import wineService from './services/wines'
import reviewService from './services/reviews'

const App = () => {
  const [wines, setWines] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    wineService.getWines().then(wines =>
      setWines( wines )
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

  const handleLogin = async (event) => {
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
  }

  const addWine = (wineObject) => {
    wineService
      .addWine(wineObject)
      .then(returnedWine => {
        setWines(wines.concat(returnedWine))
      })
  }

  if (user === null) {
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
      </div>
    )
  }
  return (
    <div>
      <h2>{user.name} logged in</h2>
    </div>
  )
}

export default App;
