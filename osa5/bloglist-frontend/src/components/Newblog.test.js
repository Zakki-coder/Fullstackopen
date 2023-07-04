import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlog from './Newblog'

test('Test NewBlog form', async () => {
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

  const addBlogMock = jest.fn()
  const user = userEvent.setup()
  render(
    <NewBlog addBlog={addBlogMock}/>
  )
  const submitButton = screen.getByRole('button', { name: 'create' })
  const title = screen.getByRole('textbox', { name: 'title:' })
  const author = screen.getByRole('textbox', { name: 'author:' })
  const url = screen.getByRole('textbox', { name: 'url:' })
  await user.type(title, blog.title)
  await user.type(author, blog.author)
  await user.type(url, blog.url)
  await user.click(submitButton)
  expect(addBlogMock.mock.calls).toHaveLength(1)
  expect(addBlogMock.mock.calls[0][0]).toBe(blog.title)
  expect(addBlogMock.mock.calls[0][1]).toBe(blog.author)
  expect(addBlogMock.mock.calls[0][2]).toBe(blog.url)
})
