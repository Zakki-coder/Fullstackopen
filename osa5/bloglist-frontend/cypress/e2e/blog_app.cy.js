describe('Blog app', function() {
  const user = {
    username: 'Hessu',
    name: 'Hessu Hopo',
    password: 'pluto'
  }
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', user)
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
  })
})
