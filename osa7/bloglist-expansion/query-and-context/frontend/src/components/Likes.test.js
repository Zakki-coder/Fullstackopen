import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Like from './Likes'

test('mocking like button', async () => {
  const blog = {
    title: 'Kukkuluuruu kaivosta',
    author: 'Kaivon Huutaja',
    url: 'https://kaivon.pohja.com',
    likes: 1337,
    user: {
      username: 'Pertti Kurikka',
      password: 'kovasikajuttu',
    },
  }

  const user = userEvent.setup()
  const mockFn = jest.fn()
  render(<Like blog={blog} addLike={mockFn} />)
  const likeButton = screen.getByText(/like/)
  await user.click(likeButton)
  await user.click(likeButton)
  expect(mockFn.mock.calls).toHaveLength(2)
})
