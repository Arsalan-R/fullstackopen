import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BlogForm from './blogForm'
import userEvent from '@testing-library/user-event'

const mockAddBlog = jest.fn()

//5.16
test('if the like button is clicked twice, the event handler the component received as props is called twice.', async () => {
  const { container } = render(<BlogForm createBlog={mockAddBlog} />)
  const title = container.querySelector('.title')
  const author = container.querySelector('.author')
  const url = container.querySelector('.url')
  await userEvent.type(title, 'something')
  await userEvent.type(author, 'someone')
  await userEvent.type(url, 'somewhere')

  const button = container.querySelector('.create')
  await userEvent.click(button)

  expect(mockAddBlog.mock.calls).toHaveLength(1)
  console.log(mockAddBlog.mock.calls[0][0])
  expect(mockAddBlog.mock.calls[0][0]).toEqual({ title: 'something', author: 'someone', url: 'somewhere' })
})