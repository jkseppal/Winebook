import React, { useState } from 'react'

const WineForm = ({ addWine, user }) => {
  const [name, setName] = useState('')
  const [region, setRegion] = useState('')
  const [grapes, setGrapes] = useState('')

  const handleWineAdd = (event) => {
    addWine({
      user: user,
      name: name,
      region: region,
      grapes: grapes
    })
    setName('')
    setRegion('')
    setGrapes('')
  }

  return (
    <div>
      <h2>Lisää uusi viini:</h2>
      <form onSubmit={handleWineAdd}>
          <div>
            name
            <input
              type="text"
              value={name}
              onChange={({ target }) => setName(target.value)}
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
  )
}

export default WineForm