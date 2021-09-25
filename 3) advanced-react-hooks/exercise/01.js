// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

//just for demonstration of lazy initialisation
// function init(count) {
//   console.log('init', count)
//   return {count: count}
// }
// const [state, dispatch] = React.useReducer(countReducer, initialCount, init)

function countReducer(state, action) {
  const {type, payload} = action
  switch (type) {
    case 'INCREMENT': {
      return {
        ...state,
        count: state.count + payload,
      }
    }
    case 'DECREMENT': {
      return {
        ...state,
        count: state.count - payload,
      }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function Counter({initialCount = 0, step = 1}) {
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })

  const {count} = state

  const increment = () => dispatch({type: 'INCREMENT', payload: step})
  const decrement = () => dispatch({type: 'DECREMENT', payload: step})

  return (
    <>
      <button onClick={increment}>INCREASE</button>
      <span> {' ' + count + ' '}</span>
      <button onClick={decrement}>DECREASE</button>
    </>
  )
}

function App() {
  return <Counter />
}

export default App
