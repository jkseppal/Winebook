describe('Winebook', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.contains('rekisteröidy käyttäjäksi').click()
    cy.get('#name').type('testaaja')
    cy.get('#username').type('testaaja')
    cy.get('#email').type('testaaja@email.com')
    cy.get('#password').type('password')
    cy.get('#retype-password').type('password')
    cy.get('#registration').click()
  })

  it('frontpage renders', function() {
    cy.contains('Sovellukseen lisätyt viinit')
  })

  describe('While logged in', function() {

    it('user can add wine', function() {
      cy.get('a[href*="create"]').click({force: true})
      cy.get('#name').type('testiviini')
      cy.get('#add-wine').click()
      cy.visit('http://localhost:3000')
      cy.contains('testiviini')
    })
    
    it('wine can be revieved', function() {
      cy.get('a[href*="create"]').click({force: true})
      cy.get('#name').type('testiviini')
      cy.get('#add-wine').click()
      cy.visit('http://localhost:3000')
      cy.contains('testiviini').click()
      cy.get('#vintage').select('1990')
      cy.get('#description').type('testiviinin kuvaus')
      cy.get('#points').select('50')
      cy.get('#add-review').click()
      cy.contains('testiviinin kuvaus')
    })
  })
})