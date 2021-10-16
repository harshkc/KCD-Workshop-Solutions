// testing custom hooks
// http://localhost:3000/counter-hook

import {renderHook, act} from '@testing-library/react-hooks'
import useCounter from '../../components/use-counter'

// function setup(props) {
//   const result = {}
//   function TestComponent() {
//     result.current = useCounter({...props})
//     return null
//   }
//   render(<TestComponent />)
//   return result
// }

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(useCounter)

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 10}})
  expect(result.current.count).toBe(10)
})

test('allows customization of the step', () => {
  const {result} = renderHook(useCounter, {initialProps: {step: 5}})

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(5)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows change in step', () => {
  const {result, rerender} = renderHook(useCounter, {initialProps: {step: 5}})

  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(5)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
  rerender({step: 10})
  act(() => result.current.increment())
  expect(result.current.count).toBe(10)
})

/* eslint no-unused-vars:0 */
