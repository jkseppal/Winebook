describe('Winebook', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.contains('rekisteröidy käyttäjäksi').click({ force: true })
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
      cy.get('a[href*="create"]').click({ force: true })
      cy.get('#name').type('testiviini')
      cy.get('#add-wine').click()
      cy.visit('http://localhost:3000')
      cy.contains('testiviini')
      cy.contains('käyttäjät').click({ force: true })
      cy.get('#username').click()
      cy.wait(3000)
      cy.get('#added-wines').contains('testiviini')
    })

    it('wine can be revieved', function() {
      cy.get('a[href*="create"]').click({ force: true })
      cy.get('#name').type('testiviini')
      cy.get('#add-wine').click()
      cy.visit('http://localhost:3000')
      cy.contains('testiviini').click()
      cy.get('#vintage').select('1990')
      cy.get('#description').type('testiviinin kuvaus')
      cy.get('#points').select('50')
      cy.get('#add-review').click()
      cy.contains('testiviinin kuvaus')
      cy.contains('käyttäjät').click({ force: true })
      cy.get('#username').click()
      cy.wait(3000)
      cy.get('#reviewed-wines').contains('testiviini')
    })

    it('review can be liked', function() {
      cy.get('a[href*="create"]').click({ force: true })
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
      cy.contains('käyttäjät').click({ force: true })
      cy.get('#username').click()
      cy.wait(3000)
      cy.get('#blogs').contains('testiblogi')
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

    it('user can change password', function() {
      cy.contains('oma profiili').click({ force:true })
      cy.get('#change-password-form').click()
      cy.get('#old-password-field').type('password')
      cy.get('#new-password-field').type('password2')
      cy.get('#retype-password-field').type('password2')
      cy.get('#change-password-button').click()
      cy.contains('kirjaudu ulos').click()
      cy.wait(3000)
      cy.contains('kirjaudu sisään').click()
      cy.get('#username').type('testaaja')
      cy.get('#password').type('password2')
      cy.get('#login-button').click()
      cy.contains('testaaja kirjautunut sisään')
    })

    it('user cannot change password with wrong original password', function() {
      cy.contains('oma profiili').click({ force:true })
      cy.get('#change-password-form').click()
      cy.get('#old-password-field').type('wrong')
      cy.get('#new-password-field').type('password2')
      cy.get('#retype-password-field').type('password2')
      cy.get('#change-password-button').click()
      cy.contains('kirjaudu ulos').click()
      cy.wait(3000)
      cy.contains('kirjaudu sisään').click()
      cy.get('#username').type('testaaja')
      cy.get('#password').type('password2')
      cy.get('#login-button').click()
      cy.contains('rekisteröidy käyttäjäksi')
    })

    it('added wines, reviews and blogs are not lost after profile is updated', function() {
      cy.get('a[href*="create"]').click({ force: true })
      cy.get('#name').type('testiviini')
      cy.get('#add-wine').click()
      cy.visit('http://localhost:3000')
      cy.contains('testiviini').click()
      cy.get('#vintage').select('1990')
      cy.get('#description').type('testiviinin kuvaus')
      cy.get('#points').select('50')
      cy.get('#add-review').click()
      cy.contains('testiviinin kuvaus')
      cy.get('a[href*="blogs"]').click({ force: true })
      cy.get('#blog-field').type('testiblogi')
      cy.get('#add-blog').click()
      cy.contains('oma profiili').click({ force: true })
      cy.get('#email').clear().type('uusi@email.com')
      cy.get('#email-switch').check({ force:true })
      cy.get('#update-email').click()
      cy.get('#change-password-form').click()
      cy.get('#old-password-field').type('password')
      cy.get('#new-password-field').type('password2')
      cy.get('#retype-password-field').type('password2')
      cy.get('#change-password-button').click()
      cy.contains('kirjaudu ulos').click()
      cy.wait(3000)
      cy.contains('kirjaudu sisään').click()
      cy.get('#username').type('testaaja')
      cy.get('#password').type('password2')
      cy.get('#login-button').click()
      cy.wait(3000)
      cy.visit('http://localhost:3000')
      cy.reload(true)
      cy.get('a[href*="users"]').click({ force: true })
      cy.get('#username').click()
      cy.get('#added-wines').contains('testiviini')
      cy.get('#reviewed-wines').contains('testiviini')
      cy.contains('testiblogi')
    })
  })

  describe('while logged out', function() {
    it('user cannot add wine', function() {
      cy.wait(3000)
      cy.contains('kirjaudu ulos').click()
      cy.contains('lisää viini').should('not.exist')
      cy.visit('http://localhost:3000/#/create')
      cy.get('#add-wine').should('not.exist')
    })

    it('user cannot review wine', function() {
      cy.get('a[href*="create"]').click({ force: true })
      cy.get('#name').type('testiviini')
      cy.get('#add-wine').click()
      cy.wait(3000)
      cy.contains('kirjaudu ulos').click()
      cy.contains('testiviini').click()
      cy.get('#vintage').should('not.exist')
      cy.get('#description').should('not.exist')
      cy.get('#points').should('not.exist')
      cy.get('#add-review').should('not.exist')
    })

    it('user cannot add blog', function() {
      cy.wait(3000)
      cy.contains('kirjaudu ulos').click()
      cy.get('a[href*="blogs"]').click()
      cy.get('#blog-field').should('not.exist')
      cy.get('#add-blog').should('not.exist')
    })

    it('user cannot add blog entry', function() {
      cy.wait(3000)
      cy.get('a[href*="blogs"]').click()
      cy.get('#blog-field').type('testiblogi')
      cy.get('#add-blog').click()
      cy.contains('kirjaudu ulos').click()
      cy.get('a[href*="blogs"]').click()
      cy.contains('testiblogi').click()
      cy.get('#add-entry-form').should('not.exist')
    })

    it('user can like blog entries', function() {
      cy.wait(3000)
      cy.get('a[href*="blogs"]').click()
      cy.get('#blog-field').type('testiblogi')
      cy.get('#add-blog').click()
      cy.contains('testiblogi').click()
      cy.get('#add-entry-form').click()
      cy.wait(3000)
      cy.get('#entry-header').type('testimerkinnän otsikko')
      cy.get('#add-entry').click()
      cy.contains('kirjaudu ulos').click()
      cy.get('a[href*="blogs"]').click()
      cy.contains('testiblogi').click()
      cy.get('#full-view').click()
      cy.get('#like-button').click()
      cy.get('#likes').contains('1')
    })

    it('user can comment blog entries', function() {
      cy.wait(3000)
      cy.get('a[href*="blogs"]').click()
      cy.get('#blog-field').type('testiblogi')
      cy.get('#add-blog').click()
      cy.contains('testiblogi').click()
      cy.get('#add-entry-form').click()
      cy.wait(3000)
      cy.get('#entry-header').type('testimerkinnän otsikko')
      cy.get('#add-entry').click()
      cy.contains('kirjaudu ulos').click()
      cy.get('a[href*="blogs"]').click()
      cy.contains('testiblogi').click()
      cy.get('#full-view').click()
      cy.get('#comment-form').click()
      cy.get('#comment-field').type('anonyymi kommentti')
      cy.get('#add-comment').click()
      cy.get('#show-comments').click()
      cy.contains('anonyymi kommentti')
    })

    it('userlist is invisible', function() {
      cy.wait(3000)
      cy.visit('http://localhost:3000/#/users')
      cy.get('#username').contains('testaaja')
      cy.contains('kirjaudu ulos').click()
      cy.visit('http://localhost:3000/#/users')
      cy.get('#username').should('not.exist')
    })
  })
})