import React from 'react'

const ReviewList = ({ reviews }) => {
  return (
    <div>
      {reviews.map(r =>
        <div key={r.id}>
          {r.description} <br />
        </div>
      )}
    </div>
  )
}

export default ReviewList