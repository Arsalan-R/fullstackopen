describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'username', password: 'password'
    }).then(response => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
      cy.visit('http://localhost:5173')
    })
    cy.visit('')
  })

  //5.17
  it('Login form is shown', function() {
    cy.contains('log in')
  })

  //5.18
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.contains('log in').click()
      cy.contains('successfully logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('random')
      cy.get('#password').type('random')
      cy.contains('log in').click()
      cy.contains('wrong credentials')
    })
  })
})