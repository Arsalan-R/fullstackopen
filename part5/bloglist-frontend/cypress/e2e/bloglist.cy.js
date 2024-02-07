describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('')
  })
  //5.17
  it('Login form is shown', function() {
    cy.contains('log in')
  })
})