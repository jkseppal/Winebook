import React, {useState, useImperativeHandle} from 'react'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : ''}
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <div className="buttonWrapper">
          <Button variant="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
        </div>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <div className="buttonWrapper">
          <Button variant="secondary" onClick={toggleVisibility}>piilota</Button>
        </div>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable