import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const WineList = ({ wines }) => {
  const [selectFilter, setSelectFilter] = useState('kaikki viinit')
  const [findFilter, setFindFilter] = useState('')
  const [countryFilter, setCountryFilter] = useState('kaikki maat')

  let winesByType = wines.filter(w => w.type === selectFilter)
  if (selectFilter === 'kaikki viinit') {
    winesByType = wines
  }

  let winesByCountry = winesByType.filter(w => w.country === countryFilter)
  if (countryFilter === 'kaikki maat') {
    winesByCountry = winesByType
  }

  let winesToShow = winesByCountry.filter(w => w.name.includes(findFilter))

  const handleSelectFilterChange = (event) => {
    setSelectFilter(event.target.value)
  }

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value)
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
        Maa:
        <select
          value={countryFilter}
          onChange={handleCountryFilterChange}
        >
          <option>kaikki maat</option>
          <option>Ranska</option>
          <option>Italia</option>
          <option>Espanja</option>
          <option>Saksa</option>
          <option>Portugali</option>
          <option>Chile</option>
          <option>Australia</option>
          <option>Argentina</option>
          <option>Etelä-Afrikka</option>
          <option>Uusi-Seelanti</option>
          <option>Itävalta</option>
          <option>Yhdysvallat</option>
          <option>Unkari</option>
          <option>muu</option>
        </select>
      Hae viinin nimellä:
        <input
          placeholder="hae..."
          value={findFilter}
          onChange={handleFindFilterChange}
        />
      {winesToShow.map(w =>
        <div key={w.id}>
          <Link to={`/wines/${w.id}`}>{w.name}</Link>
        </div>
      )}
    </div>
  )
}

export default WineList