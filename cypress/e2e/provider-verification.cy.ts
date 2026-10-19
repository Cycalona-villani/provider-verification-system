/// <reference types="cypress" />

describe('Provider verification', () => {
  it('blocks approval until checks pass, then allows approval', () => {
    cy.visit('http://localhost:5174/provider-verification-system/')

    cy.contains('tr', 'Dr. Jordan Smith').within(() => {
      cy.contains('button', 'View details').click()
    })

    cy.contains('button', 'Approve provider')
      .should('be.disabled')

    cy.contains('button', 'Run demo checks').click()

    cy.contains(/Eligible\s*[-–—]\s*awaiting approval/i)
  .should('be.visible')

    cy.contains('button', 'Approve provider')
      .should('be.enabled')
      .click()

    cy.contains('tr', 'Dr. Jordan Smith')
      .should('contain.text', 'Approved')
  })
})