// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0].value
  // 🐨 Call `onSubmitUsername` with the value of the input

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input.
  // to do so, set the value of 'htmlFor' prop of the label to the id of input

  /////////////////////////////////////////////////////////////
  /////////////////// Solution Goes Here //////////////////////
  ////////////////////////////////////////////////////////////

  /// event.target method to handle submit events
  //  const username = event.target.usernameField.value

  /// use ref method
  //  const usernameInputRef = React.useRef()
  //  const username = usernameInputRef.current.value
  //  <input ref={usernameInputRef} id="usernameField" type="text" />

  /// validate lower-case
  //  const [error, setError] = React.useState('')
  //  const isError = value === value.toLowerCase()
  //  setError(isError ? null : 'Username must be lower-case')
  //  <div style={{color: 'red'}}>{error}</div>
  //  <button disabled={Boolean(error)} type="submit"></button>

  /// controling input value

  const [username, setUsername] = React.useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSubmitUsername(username)
  }

  function handleChange(event) {
    const {value} = event.target
    setUsername(value.toLowerCase())
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="usernameField">Username:</label>
        <input
          onChange={handleChange}
          id="usernameField"
          type="text"
          value={username}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
