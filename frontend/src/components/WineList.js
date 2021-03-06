import React, { useState } from 'react'
import { Table, Form, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const WineList = ({ wines, countryList, typeList }) => {
  const [selectFilter, setSelectFilter] = useState('kaikki viinit')
  const [findFilter, setFindFilter] = useState('')
  const [countryFilter, setCountryFilter] = useState('kaikki maat')
  const [sort, setSort] = useState('name')

  let winesByType = wines.filter(w => w.type === selectFilter)
  if (selectFilter === 'kaikki viinit') {
    winesByType = wines
  }

  let winesByCountry = winesByType.filter(w => w.country === countryFilter)
  if (countryFilter === 'kaikki maat') {
    winesByCountry = winesByType
  }

  let winesToShow = winesByCountry.filter(w => w.name.toLowerCase().includes(findFilter.toLowerCase()))

  const handleSelectFilterChange = (event) => {
    setSelectFilter(event.target.value)
  }

  const handleCountryFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const handleFindFilterChange = (event) => {
    setFindFilter(event.target.value)
  }

  const average = (wine) => {
    if (wine.reviews.length === 0) {
      return null
    }
    let sum = 0
    for (let i = 0; i < wine.reviews.length; i++) {
      sum = sum + wine.reviews[i].points
    }
    return sum / wine.reviews.length
  }

  const sorter = (wines) => {
    if (sort === 'name') {
      winesByName(wines)
    } else if (sort === 'reviews') {
      winesByReviews(wines)
    } else {
      winesByAverage(wines)
    }
  }

  const winesByName = (wines) => {
    wines.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1 }
      if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1 }
      return 0
    })
  }

  const winesByReviews = (wines) => {
    wines.sort((a, b) => {
      return b.reviews.length - a.reviews.length
    })
  }

  const winesByAverage = (wines) => {
    wines.sort((a, b) => {
      return average(b) - average(a)
    })
  }

  if (!wines) {
    return null
  }

  return (
    <div className='wineList'>
      <h2>Sovellukseen lisätyt viinit:</h2>
      <table>
        <tbody>
          <tr>
            <td className="padding50right">Näytä:</td>
            <td className="padding50right">Maa:</td>
            <td className="padding50right">Hae viinin nimellä</td>
          </tr>
          <tr>
            <td className="padding50right">
              <Form.Control
                size="sm"
                as="select"
                className="select"
                value={selectFilter}
                onChange={handleSelectFilterChange}
              >
                <option>kaikki viinit</option>
                {typeList.map(t => (
                  <option key={t}>{t}</option>
                ))}
              </Form.Control>
            </td>
            <td className="padding50right">
              <Form.Control
                size="sm"
                as="select"
                className="select"
                value={countryFilter}
                onChange={handleCountryFilterChange}
              >
                <option>kaikki maat</option>
                {countryList.map(c => (
                  <option key={c}>{c}</option>
                ))}
              </Form.Control>
            </td>
            <td className="padding50right">
              <Form.Control
                size="sm"
                placeholder="hae..."
                type="text"
                value={findFilter}
                onChange={handleFindFilterChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Form>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2} style={{ paddingTop: 20 }}>
              Järjestä viinit
          </Form.Label>
          <Col sm={10} style={{ paddingTop: 20 }}>
            <Form.Check
              inline
              type="radio"
              name="sort"
              label="nimen perusteella"
              onChange={() => setSort('name')}
            />
            <Form.Check
              inline
              type="radio"
              name="sort"
              label="arvostelujen määrän perusteella"
              onChange={() => setSort('reviews')}
            />
            <Form.Check
              inline
              type="radio"
              name="sort"
              label="pisteiden keskiarvon perusteella"
              onChange={() => setSort('points')}
            />
          </Col>
        </Form.Group>
      </Form>
      <Table striped variant="dark" className='tableWrapper' hover>
        <thead>
          <tr>
            <td>Viini</td>
            <td>Arvostelut</td>
            <td>Pisteiden keskiarvo</td>
          </tr>
        </thead>
        <tbody>
          {sorter(winesToShow)}
          {winesToShow.map(w =>
            <tr key={w.id}>
              <td>
                <Link to={`/wines/${w.id}`}>{w.name}</Link>
              </td>
              <td>
                {w.reviews.length}
              </td>
              <td>
                {average(w)}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default WineList