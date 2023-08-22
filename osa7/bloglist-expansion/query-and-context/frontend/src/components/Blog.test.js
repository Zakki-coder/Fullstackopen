import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Testing Blog component', () => {
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

  const renderer = () => {
    render(
      <Blog blog={blog} index={0} allBlogs={[blog]} setBlogs={() => true} />,
    ).container
  }

  test('render blog', () => {
    renderer()
    screen.getByText(/Kukkuluuruu kaivosta/)
    screen.getByText(/Kaivon Huutaja/)
    const element1 = screen.queryByText(/https:\/\/kaivon.pohja.com/)
    expect(element1).toBeNull()
    const element2 = screen.queryByText(/1337/)
    expect(element2).toBeNull()
  })

  test('render blog with all info, after show has been clicked', async () => {
    const user = userEvent.setup()
    renderer()
    const button = screen.getByText(/view/)
    await user.click(button)
    screen.getByText(/https:\/\/kaivon.pohja.com/)
    screen.getByText(/1337/)
  })
})
