import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const WineForm = ({ addWine, user, wines, countryList, typeList }) => {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('muu')
  const [type, setType] = useState('punaviini')
  const [region, setRegion] = useState('')
  const [grapes, setGrapes] = useState('')
  const [appellation, setAppellation] = useState('')

  let reservedWineName = wines.find(w => w.name === name)

  const handleWineAdd = (event) => {
    event.preventDefault()
    addWine({
      user: user,
      name: name,
      type: type,
      country: country,
      region: region,
      appellation: appellation,
      grapes: grapes
    })
    setName('')
    setType('punaviini')
    setCountry('muu')
    setAppellation('')
    setRegion('')
    setGrapes('')
  }

  let approved = false
  if (name && !reservedWineName) {
    approved = true
  }

  const ReservedText = () => {
    if (!reservedWineName) {
      return null
    }
    return (
      <div style={{ color: 'red' }}>Tällä nimellä on jo lisätty viini sovellukseen</div>
    )
  }

  const SubmitButton = () => {
    if (approved === false) {
      return (
        <Button type="submit" variant="success" disabled>lisää</Button>
      )
    }
    return (
      <Button type="submit" variant="success" id="add-wine">lisää</Button>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className='wineList'>
      <h2>Lisää uusi viini:</h2>
      <Form onSubmit={handleWineAdd}>
        <table>
          <tbody>
            <tr>
              <td>
                <Form.Label>nimi</Form.Label>
              </td>
              <td className="blockWrapper">
                <Form.Control
                  type="text"
                  id="name"
                  placeholder="esim. Torres Sangre de Toro"
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td><ReservedText /></td>
            </tr>
            <tr>
              <td>
                <Form.Label>tyyppi</Form.Label>
              </td>
              <td className="blockWrapper">
                <Form.Control
                  as="select"
                  className="select"
                  id="type"
                  value={type}
                  onChange={({ target }) => setType(target.value)}
                >
                  {typeList.map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </Form.Control>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>maa</Form.Label>
              </td>
              <td className="blockWrapper">
                <Form.Control
                  as="select"
                  className="select"
                  id="country"
                  value={country}
                  onChange={({ target }) => setCountry(target.value)}
                >
                  {countryList.map(c => (
                    <option key={c}>{c}</option>
                  ))}
                </Form.Control>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>alue</Form.Label>
              </td>
              <td className="blockWrapper">
                <Form.Control
                  type="text"
                  id="region"
                  placeholder="esim. Bordeaux"
                  value={region}
                  onChange={({ target }) => setRegion(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>laatuluokitus</Form.Label>
              </td>
              <td className="blockWrapper">
                <Form.Control
                  type="text"
                  id="appellation"
                  placeholder="esim. DOCG Barolo"
                  value={appellation}
                  onChange={({ target }) => setAppellation(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>rypäleet</Form.Label>
              </td>
              <td className="blockWrapper">
                <Form.Control
                  type="text"
                  id="grapes"
                  placeholder="esim. Cabernet Sauvignon, Merlot"
                  value={grapes}
                  onChange={({ target }) => setGrapes(target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="buttonWrapper">
          <SubmitButton />
        </div>
      </Form>
    </div>
  )
}

export default WineForm