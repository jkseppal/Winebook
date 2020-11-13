import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const WineForm = ({ addWine, user }) => {
  const [name, setName] = useState('')
  const [country, setCountry] = useState('muu')
  const [type, setType] = useState('punaviini')
  const [region, setRegion] = useState('')
  const [grapes, setGrapes] = useState('')
  const [appellation, setAppellation] = useState('')

  const handleWineAdd = (event) => {
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

  return (
    <div>
      <h2>Lisää uusi viini:</h2>
      <Form onSubmit={handleWineAdd}>
        <table>
          <tbody>
            <tr>
              <td>
                <Form.Label>nimi</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="esim. Torres Sangre de Toro"
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>tyyppi</Form.Label>
              </td>
              <td>
                <Form.Control
                  as="select"
                  value={type}
                  onChange={({ target }) => setType(target.value)}
                >
                  <option>punaviini</option>
                  <option>valkoviini</option>
                  <option>roseeviini</option>
                  <option>kuohuviini</option>
                  <option>maustettu viini</option>
                  <option>väkevä viini</option>
                  <option>jälkiruokaviini</option>
                  <option>muu</option>
                </Form.Control>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>maa</Form.Label>
              </td>
              <td>
                <Form.Control
                  as="select"
                  value={country}
                  onChange={({ target }) => setCountry(target.value)}
                >
                  <option>muu</option>
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
                  <option>Kreikka</option>
                </Form.Control>
              </td>
            </tr>
            <tr>
              <td>
                <Form.Label>alue</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
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
              <td>
                <Form.Control
                  type="text"
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
              <td>
                <Form.Control
                  type="text"
                  placeholder="esim. cabernet sauvignon, merlot"
                  value={grapes}
                  onChange={({ target }) => setGrapes(target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Button variant="success" type="submit">lisää</Button>
      </Form>
    </div>
  )
}

export default WineForm