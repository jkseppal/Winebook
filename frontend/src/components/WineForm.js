import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const WineForm = ({ addWine, user }) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('punaviini')
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
                <Form.Label>alue</Form.Label>
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={region}
                  onChange={({ target }) => setRegion(target.value)}
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
                  value={grapes}
                  onChange={({ target }) => setGrapes(target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <Button variant="success" type="submit">lisää</Button>
      </Form>
      {/*<form onSubmit={handleWineAdd}>
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
      </form>*/}
    </div>
  )
}

export default WineForm