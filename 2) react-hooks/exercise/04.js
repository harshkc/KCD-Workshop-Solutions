// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

// 🐨 squares is the state for this component. Add useState for squares
// 🐨 We'll need the following bits of derived state:
// - nextValue ('X' or 'O')
// - winner ('X', 'O', or null)
// - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
// 💰 I've written the calculations for you! So you can use my utilities
// below to create these variables
// This is the function your square click handler will call. `square` should
// be an index. So if they click the center square, this will be `4`.
// 🐨 first, if there's already winner or there's already a value at the
// given square index (like someone clicked a square that's already been
// clicked), then return early so we don't make any state changes
//
// 🦉 It's typically a bad idea to mutate or directly change state in React.
// Doing so can lead to subtle bugs that can easily slip into production.
//
// 🐨 make a copy of the squares array
// 💰 `[...squares]` will do it!)
//
// 🐨 set the value of the square that was selected
// 💰 `squaresCopy[square] = nextValue`
//
// 🐨 set the squares to your copy

// 🐨 reset the squares
// 💰 `Array(9).fill(null)` will do it!

function Board({selectSquare, squares}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [
    Array(9).fill(null),
  ])
  const [stepNumber, setStepNumber] = useLocalStorageState(
    'tic-tac-toe:step',
    0,
  )

  const currentSquare = history[stepNumber]
  const nextValue = calculateNextValue(currentSquare)
  const winner = calculateWinner(currentSquare)
  const status = calculateStatus(winner, currentSquare, nextValue)

  function selectSquare(square) {
    if (currentSquare[square] || winner) return

    const historySquareCopy = history.slice(0, stepNumber + 1)

    const squaresCopy = [...currentSquare]
    squaresCopy[square] = nextValue
    setHistory([...historySquareCopy, squaresCopy])
    setStepNumber(historySquareCopy.length)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setStepNumber(0)
  }

  const moves = history.map((_, move) => {
    const desc = move ? `Go to move ${move}` : 'Go to game start'
    const isCurrent = stepNumber === move
    return (
      <li key={move}>
        <button disabled={isCurrent} onClick={() => setStepNumber(move)}>
          {desc} {isCurrent && '(current)'}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={currentSquare} selectSquare={selectSquare} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
