/// <reference types="cypress" />

describe('Home page', () => {
    it('it is working', () => {
        cy.visit('/')

        cy.get('[data-cy=signup]')
            .invoke('text')
            .should('equal', 'Sign Up')

        cy.get('[data-cy=login]')
            .invoke('text')
            .should('equal', 'Log In')


    })
})