import React, { useEffect, useState } from 'react'
import wineService from '../services/wines'
import reviewService from '../services/reviews'
import loginService from '../services/login'

const Login = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
      window.location.reload()
    } catch (exception) {
      console.log('invalid username or password')
    }
  }

  if (user) {
    return (
      <h2>{user.username} logged in</h2>
    )
  } else {
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
  
}

export default Login