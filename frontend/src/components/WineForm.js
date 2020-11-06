import React, { useState } from 'react'

const WineForm = ({ addWine, user }) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [region, setRegion] = useState('')
  const [grapes, setGrapes] = useState('')

  const handleWineAdd = (event) => {
    addWine({
      user: user,
      name: name,
      type: type,
      region: region,
      grapes: grapes
    })
    setName('')
    setType('')
    setRegion('')
    setGrapes('')
  }

  return (
    <div>
      <h2>Lisää uusi viini:</h2>
      <form onSubmit={handleWineAdd}>
          <div>
            nimi
            <input
              type="text"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            tyyppi
            <input
              type="text"
              value={type}
              onChange={({ target }) => setType(target.value)}
            />
          </div>
          <div>
            alue
            <input
              type="text"
              value={region}
              onChange={({ target }) => setRegion(target.value)}
            />
          </div>
          <div>
            rypäleet
            <input
              type="text"
              value={grapes}
              onChange={({ target }) => setGrapes(target.value)}
            />
          </div>
          <button type="submit">lisää</button>
        </form>
    </div>
  )
}

export default WineForm