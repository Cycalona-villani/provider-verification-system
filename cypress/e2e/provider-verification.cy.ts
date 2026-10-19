/// <reference types="cypress" />

describe('Provider verification', () => {
  beforeEach(() => {
    cy.visit('/provider-verification-system/')
  })

  it('blocks approval until checks pass, then allows approval', () => {
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

  it('keeps approval blocked for an expired license after identity confirmation', () => {
    cy.contains('tr', 'Dr. Morgan Davis').within(() => {
      cy.contains('button', 'View details').click()
    })

    cy.contains('button', 'Run demo checks').click()

    cy.contains(/License check:\s*expired/i)
      .should('be.visible')

    cy.contains('button', 'Approve provider')
      .should('be.disabled')

    cy.get('textarea').type(
      'Demo evidence: simulated documents resolve the identity mismatch.'
    )

    cy.contains('button', 'Confirm identity')
      .should('be.enabled')
      .click()

    cy.contains('h3', 'Manual identity review')
      .should('not.exist')

    cy.contains(/Identity check:\s*mismatch/i)
      .should('be.visible')

    cy.contains(/License check:\s*expired/i)
      .should('be.visible')

    cy.contains('button', 'Approve provider')
      .should('be.disabled')

    cy.contains(/Accepting patients:\s*Blocked/i)
      .should('be.visible')

    cy.contains('tr', 'Dr. Morgan Davis')
      .should('not.contain.text', 'Approved')
  })
    it('blocks approval during an outage and allows a successful retry', () => {
    cy.contains('label', /simulate verification service outage/i)
      .find('input[type="checkbox"]')
      .check()

    cy.contains('tr', 'Dr. Jordan Smith').within(() => {
      cy.contains('button', 'View details').click()
    })

    cy.contains('button', 'Run demo checks').click()

    cy.get('[role="alert"]')
      .should('contain.text', 'Verification service unavailable')

    cy.contains('button', 'Approve provider')
      .should('be.disabled')

    cy.contains('button', 'Run demo checks')
      .should('be.enabled')

    cy.contains('label', /simulate verification service outage/i)
      .find('input[type="checkbox"]')
      .uncheck()

    cy.contains('button', 'Run demo checks').click()

    cy.contains(/Eligible\s*[-–—]\s*awaiting approval/i)
      .should('be.visible')

    cy.get('[role="alert"]').should('not.exist')

    cy.contains('button', 'Approve provider')
      .should('be.enabled')
  })
})