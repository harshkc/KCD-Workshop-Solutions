// Styling
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import '../box-styles.css'

// 💰 Use the className for the size and style (backgroundColor, fontStyle) for the color and the font style
// 💰 each of the elements should also have the "box" className applied

// 🐨 add a className prop to each of these and apply the correct class names
// 💰 Here are the available class names: box, box--large, box--medium, box--small

// 🐨 add a style prop to each of them as well so their background color
// matches what the text says it should be as well as `fontStyle: 'italic'`

////////////////////////////////////////////////////////////////////////////////
////////////////////////SOLUTION GOES HERE//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const Box = ({size, style, color, children}) => {
  const className = `box box--${size}`
  return (
    <div
      className={className}
      style={{fontStyle: 'italic', backgroundColor: color, ...style}}
    >
      {children}
    </div>
  )
}

function App() {
  return (
    <>
      <Box
        size="small"
        style={{backgroundColor: 'red'}}
        color="lightblue"
        children="small lightblue box"
      >
        TEST
      </Box>
      <Box size="medium" color="pink" children="medium pink box" />
      <Box size="large" color="orange" children="large orange box" />
    </>
  )
}

export default App
