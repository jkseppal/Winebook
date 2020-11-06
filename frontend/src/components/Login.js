import React, { useEffect, useState } from 'react'
import wineService from '../services/wines'
import reviewService from '../services/reviews'
import loginService from '../services/login'
import { Form, Button } from 'react-bootstrap'

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
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      console.log('user: ', window.localStorage.getItem('loggedUser'))
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
      <h2>Sisäänkirjautuminen onnistunut</h2>
    )
  } else {
    return (
      <div>
        <h2>Kirjaudu sisään:</h2>
        <Form onSubmit={handleLogin}>
          <table>
            <tbody>
              <tr>
                <td>
                  <Form.Label>käyttäjätunnus</Form.Label>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <Form.Label>salasana</Form.Label>
                </td>
                <td>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Button type="submit">kirjaudu</Button>
        </Form>
        {/*<form onSubmit={handleLogin}>
          <div>
            käyttäjätunnus
            <input
              id='username'
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            salasana
            <input
              id='password'
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
    </form>*/}
      </div>
    )
  }
  
}

export default Login