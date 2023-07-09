describe('Blog app', function() {
  const user = {
    username: 'Hessu',
    name: 'Hessu Hopo',
    password: 'pluto'
  }

  const wrongUser = {
    username: 'Aku',
    name: 'Aku Ankka',
    password: 'tupuhupujalupu'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.request('POST', 'http://localhost:3003/api/users', wrongUser)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('h2')
      .should('contain', 'Login to application')
    cy.contains(/^username$/)
    cy.contains(/^password$/)
    cy.contains(/^login$/)
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
      cy.contains(`${user.username} logged in`)
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('DoesNotExist')
      cy.get('#password').type('Incorrect')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })

    it('fails without credentials', function () {
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    const blog = {
      title: 'Coding in the basement',
      author: '10xDev',
      url: 'www.mybasement.com'
    }

    beforeEach(function() {
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#create-blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#create-button').click()
      cy.contains(`${blog.title} by ${blog.author} added`)
      cy.contains(`${blog.title} ${blog.author}`)
    })

    describe('When blog has been created', function() {
      beforeEach(function() {
        cy.get('#create-blog').click()
        cy.get('#title').type(blog.title)
        cy.get('#author').type(blog.author)
        cy.get('#url').type(blog.url)
        cy.get('#create-button').click()
      })

      it('It can be liked', function() {
        cy.get('#view-button').click()
        cy.get('#like-button').click()
        cy.get('#likes').then( block => {
          expect(block).to.contain('1')
        })
      })

      it('It can\'t be deleted by wrong user', function() {
        cy.get('#logout-button').click()
        cy.get('#username').type(wrongUser.username)
        cy.get('#password').type(wrongUser.password)
        cy.get('#login-button').click()
        cy.get('#view-button').click()
        cy.get('#remove-button').should('not.be.visible')
      })

      it('It can be deleted by user who added the blog', function() {
        cy.get('#view-button').click()
        cy.get('#bloglist').should(bloglist => {
          expect(bloglist).to.contain(`${blog.title} ${blog.author}`)
        })
        cy.get('#remove-button').click()
        cy.get('#bloglist').should(bloglist => {
          expect(bloglist).not.to.contain(`${blog.title} ${blog.author}`)
        })
      })

      describe('Blogs are ordered based on likes', function() {
        cy.createBlog = function({ title, author, url }) {
          cy.get('#create-blog').click()
          cy.get('#title').type(title)
          cy.get('#author').type(author)
          cy.get('#url').type(url)
          cy.get('#create-button').click()
        }

        const firstBlog = {
          title: 'Added First',
          author: 'Spammer',
          url: 'www.spamspamspam.com'
        }

        const secondBlog = {
          title: 'Added Second',
          author: 'Spammer',
          url: 'www.spamspamspam.com'
        }

        const thirdBlog = {
          title: 'Added Third',
          author: 'Spammer',
          url: 'www.spamspamspam.com'
        }

        beforeEach(function () {
          cy.createBlog(firstBlog)
          cy.createBlog(secondBlog)
          cy.createBlog(thirdBlog)
        })

        it('Blogs are in order', async function() {
          cy.get('.blog').eq(0).should('contain', blog.title)
          cy.get('.blog').eq(1).should('contain', firstBlog.title)
          cy.get('.blog').eq(2).should('contain', secondBlog.title)
          cy.get('.blog').eq(3).should('contain', thirdBlog.title)
          cy.get('.blog').eq(3).find('#view-button').click()
          cy.get('.blog').eq(3).find('#like-button').click()
          cy.get('.blog').eq(0).should('contain', thirdBlog.title)
          cy.get('.blog').eq(2).find('#view-button').click()
          cy.get('.blog').eq(2).find('#like-button').should('contain', 'like').click()
          cy.get('.blog').eq(1).find('#like-button').should('contain', 'like').click()
          cy.get('.blog').eq(0).contains(firstBlog.title)
          cy.get('.blog').eq(1).contains(thirdBlog.title)
        })
      })
    })
  })
})
