import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import wineService from '../services/wines'
import reviewService from '../services/reviews'
//import usersService from '../services/users'
import loginService from '../services/login'
import { Form, Button } from 'react-bootstrap'
import { errorMessageChange } from '../reducers/errorReducer'
import { notificationChange } from '../reducers/notificationReducer'

const Login = () => {
  const dispatch = useDispatch()
  
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
      //window.location.reload()
      window.location.assign('/')
      dispatch(notificationChange('Onnistunut sisäänkirjautuminen!', 3))
    } catch (exception) {
      dispatch(errorMessageChange('Virheellinen käyttäjätunnus tai salasana', 5))
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
        <Form id="login" onSubmit={handleLogin}>
          <table>
            <tbody>
              <tr>
                <td>
                  <Form.Label>käyttäjätunnus</Form.Label>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    id="username"
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
                    id="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <Button type="submit" id="login-button">kirjaudu</Button>
        </Form>
      </div>
    )
  }
  
}

export default Login