// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', () => {
  let submittedData
  const handleSubmit = data => (submittedData = data)
  render(<Login onSubmit={handleSubmit} />)
  const username = screen.getByLabelText(/username/i)
  const password = screen.getByLabelText(/password/i)
  userEvent.type(username, 'Infosys')
  userEvent.type(password, 'HatesTest')
  const submitButton = screen.getByRole('button', {name: /submit/i})
  userEvent.click(submitButton)

  expect(submittedData).toEqual({username: 'Infosys', password: 'HatesTest'})
})

/*
eslint
  no-unused-vars: "off",
*/
