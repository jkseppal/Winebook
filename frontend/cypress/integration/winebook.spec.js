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

    it('user can log out', function() {
      cy.wait(3000)
      cy.contains('kirjaudu ulos').click()
      cy.contains('kirjaudu sisään')
    })
    
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

    it('review can be liked', function() {
      cy.get('a[href*="create"]').click({force: true})
      cy.get('#name').type('testiviini')
      cy.get('#add-wine').click()
      cy.visit('http://localhost:3000')
      cy.contains('testiviini').click()
      cy.get('#vintage').select('1990')
      cy.get('#description').type('testiviinin kuvaus')
      cy.get('#points').select('50')
      cy.get('#add-review').click()
      cy.get('#like-button').click()
      cy.get('#like-button').click()
      cy.contains('2')
    })

    it('blog can be created', function() {
      cy.wait(3000)
      cy.get('a[href*="blogs"]').click()
      cy.get('#blog-field').type('testiblogi')
      cy.get('#add-blog').click()
      cy.contains('testiblogi')
    })

    it('blog entry can be created', function() {
      cy.wait(3000)
      cy.get('a[href*="blogs"]').click()
      cy.get('#blog-field').type('testiblogi')
      cy.get('#add-blog').click()
      cy.contains('testiblogi').click()
      cy.get('#add-entry-form').click()
      cy.wait(3000)
      cy.get('#entry-header').type('testimerkinnän otsikko')
      cy.get('#add-entry').click()
      cy.contains('testimerkinnän otsikko')
    })

    it('blog entry can be liked', function() {
      cy.wait(3000)
      cy.get('a[href*="blogs"]').click()
      cy.get('#blog-field').type('testiblogi')
      cy.get('#add-blog').click()
      cy.contains('testiblogi').click()
      cy.get('#add-entry-form').click()
      cy.wait(3000)
      cy.get('#entry-header').type('testimerkinnän otsikko')
      cy.get('#add-entry').click()
      cy.get('#full-view').click()
      cy.get('#like-button').click()
      cy.get('#likes').contains('1')
    })

    it('blog entry can be commented', function() {
      cy.wait(3000)
      cy.get('a[href*="blogs"]').click()
      cy.get('#blog-field').type('testiblogi')
      cy.get('#add-blog').click()
      cy.contains('testiblogi').click()
      cy.get('#add-entry-form').click()
      cy.wait(3000)
      cy.get('#entry-header').type('testimerkinnän otsikko')
      cy.get('#add-entry').click()
      cy.get('#full-view').click()
      cy.get('#comment-form').click()
      cy.get('#comment-field').type('testimerkinnän kommentti')
      cy.get('#add-comment').click()
      cy.get('#show-comments').click()
      cy.contains('testimerkinnän kommentti')
    })

    it('user can add description', function() {
      cy.contains('oma profiili').click({ force: true })
      cy.get('#description').type('testikuvaus')
      cy.get('#add-description').click()
      cy.contains('käyttäjät').click({ force: true })
      cy.get('#username').click()
      cy.contains('testikuvaus')
    })

    it('user can change name', function() {
      cy.contains('oma profiili').click({ force: true })
      cy.get('#name').type('uusi nimi')
      cy.get('#change-name').click()
      cy.contains('käyttäjät').click({ force: true })
      cy.get('#username').click()
      cy.contains('uusi nimi')
    })

    it('user can change email and set it visible', function() {
      cy.contains('oma profiili').click({ force: true })
      cy.get('#email').clear().type('uusi@email.com')
      cy.get('#email-switch').check({ force:true })
      cy.get('#update-email').click()
      cy.contains('käyttäjät').click({ force: true })
      cy.get('#username').click()
      cy.contains('uusi@email.com')
    })

    it('user can add link to facebook and set it visible', function() {
      cy.contains('oma profiili').click({ force: true })
      cy.get('#facebook').type('http://facebook.com/testaaja')
      cy.get('#facebook-switch').check({ force: true })
      cy.get('#update-facebook').click()
      cy.contains('käyttäjät').click({ force: true })
      cy.get('#username').click()
      cy.get('a[href*="facebook.com/testaaja"]')
    })

    it('user can add link to instagram and set it visible', function() {
      cy.contains('oma profiili').click({ force: true })
      cy.get('#instagram').type('http://instagram.com/testaaja')
      cy.get('#instagram-switch').check({ force: true })
      cy.get('#update-instagram').click()
      cy.contains('käyttäjät').click({ force: true })
      cy.get('#username').click()
      cy.get('a[href*="instagram.com/testaaja"]')
    })
    
    it('user can add link to twitter and set it visible', function() {
      cy.contains('oma profiili').click({ force: true })
      cy.get('#twitter').type('http://twitter.com/testaaja')
      cy.get('#twitter-switch').check({ force: true })
      cy.get('#update-twitter').click()
      cy.contains('käyttäjät').click({ force: true })
      cy.get('#username').click()
      cy.get('a[href*="twitter.com/testaaja"]')
    })
  })
})