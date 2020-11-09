import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const WineList = ({ wines }) => {
  const [selectFilter, setSelectFilter] = useState('kaikki viinit')
  const [findFilter, setFindFilter] = useState('')

  let winesToShow = wines.filter(w => w.type === selectFilter)
  if (selectFilter === 'kaikki viinit') {
    winesToShow = wines
  }

  let winesToFind = winesToShow.filter(w => w.name.includes(findFilter))

  const handleSelectFilterChange = (event) => {
    setSelectFilter(event.target.value)
  }

  const handleFindFilterChange = (event) => {
    setFindFilter(event.target.value)
  }
  
  if (!wines) {
    return null
  }

  return (
    <div>
      <h2>Sovellukseen lisätyt viinit:</h2>
      Näytä:
        <select
          value={selectFilter}
          onChange={handleSelectFilterChange}
        >
          <option>kaikki viinit</option>
          <option>punaviini</option>
          <option>valkoviini</option>
          <option>roseeviini</option>
          <option>kuohuviini</option>
          <option>maustettu viini</option>
          <option>väkevä viini</option>
          <option>jäkiruokaviini</option>
          <option>muu</option>
        </select>
      Hae viinin nimellä:
        <input
          value={findFilter}
          onChange={handleFindFilterChange}
        />
      {winesToFind.map(w =>
        <div key={w.id}>
          <Link to={`/wines/${w.id}`}>{w.name}</Link>
        </div>
      )}
    </div>
  )
}

export default WineList