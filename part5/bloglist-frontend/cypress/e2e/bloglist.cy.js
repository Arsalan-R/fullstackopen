describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'username', password: 'password'
    })
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'random', password: 'random'
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
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.contains('log in').click()
      cy.contains('wrong credentials')
    })
  })

  //5.19
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.contains('log in').click()
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('.title').type('something')
      cy.get('.author').type('someone')
      cy.get('.url').type('somewhere')
      cy.get('.create').click()
      cy.contains('something someone')
    })

    //5.20
    it('a blog can be liked', function() {
      cy.contains('New blog').click()
      cy.get('.title').type('something')
      cy.get('.author').type('someone')
      cy.get('.url').type('somewhere')
      cy.get('.create').click()
      cy.contains('show').click()
      cy.contains('like').click()
      cy.contains('likes: 1')
    })

    //5.21
    it('The user can delete a blog', function() {
      cy.contains('New blog').click()
      cy.get('.title').type('something')
      cy.get('.author').type('someone')
      cy.get('.url').type('somewhere')
      cy.get('.create').click()
      cy.contains('show').click()
      cy.contains('Remove').click()
      cy.contains('Successfully removed the blog!')
      cy.get('html').should('not.contain', 'something someone')
    })

    //5.22
    it('a user can only see the delete button of his own', function(){
      cy.contains('New blog').click()
      cy.get('.title').type('something')
      cy.get('.author').type('someone')
      cy.get('.url').type('somewhere')
      cy.get('.create').click()
      cy.contains('show').click()
      cy.contains('Remove')
      cy.contains('Logout').click()
      cy.get('#username').type('random')
      cy.get('#password').type('random')
      cy.contains('log in').click()
      cy.contains('show').click()
      cy.contains('Remove').should('not.exist')
    })

    //5.23
    it('a user can only see the delete button of his own', function(){
      cy.contains('New blog').click()
      cy.get('#title').type('most likes')
      cy.get('.author').type('someone')
      cy.get('.url').type('somewhere')
      cy.get('.create').click()
      cy.wait(3000)
      cy.contains('New blog').click()
      cy.get('#title').type('least likes')
      cy.get('.author').type('someone2')
      cy.get('.url').type('somewhere')
      cy.get('.create').click()
      cy.wait(3000)
      cy.get('.blog').eq(0).should('contain', 'most likes')
      cy.get('.blog').eq(1).should('contain', 'least likes')
      cy.contains('show').eq(0).click()
      cy.get('#like').click()
      cy.get('.blog').eq(0).should('contain', 'least likes')
      cy.get('.blog').eq(1).should('contain', 'most likes')
    })
  })
})