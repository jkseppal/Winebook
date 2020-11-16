import React from 'react'

const Profile = ({ user }) => {
  return (
    <div>
      <h2>{user.username}</h2>
    </div>
  )
}

export default Profile