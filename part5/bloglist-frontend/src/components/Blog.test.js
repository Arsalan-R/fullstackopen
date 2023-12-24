import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

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

//5.13
test('renders title and author by default', () => {

  const { container } = render(<Blog blog={mockBlog} likeBlog={mockLikeBlog} removeBlog={mockRemoveBlog} username={mockUsername} />)

  const title = container.querySelector('.title')
  expect(title).toHaveTextContent(
    'something someone'
  )
  const info = container.querySelector('.moreInfo')
  expect(info).toHaveStyle('display: none')

  const likes = screen.getByText('likes: 10')
  const url = screen.getByText('url: somewhere')
  expect(likes).not.toBeVisible()
  expect(url).not.toBeVisible()
})
//5.14
test('blog\'s URL and number of likes are shown when the button controlling the shown details has been clicked', async () => {

  const { container } = render(<Blog blog={mockBlog} likeBlog={mockLikeBlog} removeBlog={mockRemoveBlog} username={mockUsername} />)

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const info = container.querySelector('.moreInfo')
  expect(info).not.toHaveStyle('display: none')
  const likes = screen.getByText('likes: 10')
  const url = screen.getByText('url: somewhere')
  expect(likes).toBeVisible()
  expect(url).toBeVisible()

})