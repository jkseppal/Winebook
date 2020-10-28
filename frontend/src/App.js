import React, { useState, useEffect } from 'react'
import loginService from './services/login'
//import userService from './services/users'
import wineService from './services/wines'
import reviewService from './services/reviews'
import Wine from './components/Wine'

const App = () => {
  const [wines, setWines] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [wineName, setWineName] = useState('')
  const [region, setRegion] = useState('')
  const [grapes, setGrapes] = useState('')

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
      {/*<div>
        <h3>wines</h3>
        {wines.map(wine =>
          <div key={wine.id}>
            name: {wine.name}<br />
            added by: {wine.user.username}<br />
            add a review: <br />
            
          </div>
        )}
        </div>*/}
        {wines.map(wine =>
          <Wine key={wine.id} wine={wine} user={user} />
        )}
    </div>
  )
}

export default App;
