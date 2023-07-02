import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
//Move into Like.test.js
import Like from './Likes'
//Same here
import NewBlog from './Newblog'

describe('Testing Blog component', () => {
  const blog = {
    title: 'Kukkuluuruu kaivosta',
    author: 'Kaivon Huutaja',
    url: 'https://kaivon.pohja.com',
    likes: 1337,
    user: {
      username: 'Pertti Kurikka',
      password: 'kovasikajuttu'
    }
  }

  const renderer = () => {
    render(<Blog blog={blog} index={0} allBlogs={[blog]} setBlogs={() => true} />).container
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

  //Put this in Like.test.js
  test('mocking like button' , async () => {
    const user = userEvent.setup()
    const mockFn = jest.fn()
    render(
      <Like blog={blog} addLike={mockFn} />
    )
    const likeButton = screen.getByText(/like/)
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockFn.mock.calls).toHaveLength(2)
  })

  //Put in NewBlog.test.js
  //({ blogFormRef, blogs, setBlogs, setNotification })
  test('Test NewBlog form', async () => {
    const setBlogsMock = jest.fn()
    const setNotificationMock = jest.fn()
    const { container } = render(
      <NewBlog blogs={[blog]} setBlogs={setBlogsMock} setNotification={setNotificationMock}/>
    )
    screen.debug(container)

  })
})
