import React from 'react'
import { Link } from 'react-router-dom'

const WineList = ({ wines }) => {
  if (!wines) {
    return null
  }

  return (
    <div>
      {wines.map(w =>
        <div key={w.id}>
          <Link to={`/wines/${w.id}`}>{w.name}</Link>
        </div>
      )}
    </div>
  )
}

export default WineList