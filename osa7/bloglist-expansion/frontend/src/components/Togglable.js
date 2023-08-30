import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

//  const hideWhenVisible = { display: visible ? 'none' : '' }
//  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisible,
    }
  })

  const style = {
    textAlign: 'center',
    marginBottom: '3px'
  }

  return (
    <div>
      {!visible &&
      <div style={style}>
        <button id="create-blog" onClick={toggleVisible}>
          {props.buttonLabel}
        </button>
      </div>
      }
      {visible &&
      <div>
        {props.children}
        <button id="cancel-button" onClick={toggleVisible}>
          cancel
        </button>
      </div>
      }
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
