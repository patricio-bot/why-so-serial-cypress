/// <reference types="cypress" />

describe('/login', () => {
    beforeEach(() => {
        cy.visit('/login')
    })
    it('has Log In', () => {
        cy.get('[data-cy=login-title]')
            .invoke('text')
            .should('equal', 'Log In')
    })
    it('links to /signup', () => {
        cy.get('[data-cy=signup-link]')
            .should('exist')
            .should('have.prop', 'tagName')
            .should('eq', 'A')
        cy.get('[data-cy=signup-link]')
            .should('have.attr', 'href', '/signup')
    })

    it('requires email', () => {
        cy.get('[data-cy = login-form]')
            .contains('Log In')
            .click()
        cy.get('.error-message')
            .should('contain', 'Enter both email and password to log in')
    })
    it('requires password', () => {
        cy.get('[data-cy=test-email]').type('jane@mail.com{enter}')
        cy.get('.error-message')
            .should('contain', 'Enter both email and password to log in')
    })
    it('requires valid email', () => {
        cy.get('[data-cy=test-email]').clear().type('jane@mail.com')
        cy.get('[data-cy=password]').type('123')
        cy.get('[data-cy=submit-login]').click()
        cy.get('.error-message').should('be.visible')
    })
    it('requires valid password', () => {
        cy.get('[data-cy=test-email]').clear().type('tere@mail.com')
        cy.get('[data-cy=password]').type('1234568')
        cy.get('[data-cy=submit-login]').click()
        cy.get('.error-message').should('be.visible').and('contain', 'Invalid password')
    })
    it('email and password are valid', () => {
        cy.get('[data-cy=test-email]').clear().type('tere@mail.com')
        cy.get('[data-cy=password]').type('123{enter}')
        cy.visit('/')
    })
})