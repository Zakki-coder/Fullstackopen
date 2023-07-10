import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const createAction = ( actionType ) => { return {
    type: actionType
  }}

  const vote = ( actionType ) => {
    const action = createAction(actionType)
    store.dispatch(action)
  }

  return (
    <div>
      <button onClick={() => vote('GOOD')}>good</button> 
      <button onClick={() => vote('OK')}>ok</button> 
      <button onClick={() => vote('BAD')}>bad</button>
      <button onClick={() => vote('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
