import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const ErrorMessage = () => {
  const errorMessage = useSelector(state => state.errorMessage)

  if (errorMessage === '') {
    return null
  }

  return (
    <Alert variant="danger">{errorMessage}</Alert>
  )
}

export default ErrorMessage