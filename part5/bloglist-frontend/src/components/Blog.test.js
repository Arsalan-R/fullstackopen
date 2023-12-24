import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author by default', () => {

  const mockBlog  = {
    'title': 'something',
    'author': 'someone',
    'url': 'somewhere',
    'likes': 10,
    'user': {
      'username': 'some username',
      'name': 'some name',
      'id': 'user id'
    },
    'id': 'blog id'
  }
  const mockUsername = 'testuser'
  const mockLikeBlog = jest.fn()
  const mockRemoveBlog = jest.fn()

  const { container } = render(<Blog blog={mockBlog} likeBlog={mockLikeBlog} removeBlog={mockRemoveBlog} username={mockUsername} />)
  screen.debug()
  const title = container.querySelector('.title')
  expect(title).toHaveTextContent(
    'something someone'
  )
  const info = container.querySelector('.moreInfo')
  expect(info).toHaveStyle('display: none')
})
