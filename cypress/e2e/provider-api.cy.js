describe('Provider API integration', () => {
  it('displays provider records returned by the API', () => {
    cy.intercept('GET', '**/api/providers', {
      statusCode: 200,
      body: [
        {
          id: 101,
          name: 'Demo API Provider',
          specialty: 'Clinical Psychology',
          state: 'CA',
          licenseStatus: 'active',
          onboardingStatus: 'in_review',
        },
      ],
    }).as('getProviders')

    cy.visit('http://localhost:5173/provider-verification-system/')
    cy.wait('@getProviders')

    cy.get('section[aria-labelledby="api-heading"]').within(() => {
      cy.contains('tr', 'Demo API Provider').within(() => {
        cy.contains('td', 'Clinical Psychology').should('be.visible')
        cy.contains('td', 'CA').should('be.visible')
        cy.contains('td', 'active').should('be.visible')
        cy.contains('td', 'in review').should('be.visible')
      })

      cy.contains('Loading providers…').should('not.exist')
      cy.get('[role="alert"]').should('not.exist')
    })
  })

  it('shows an error when the API is unavailable', () => {
    cy.intercept('GET', '**/api/providers', {
      forceNetworkError: true,
    }).as('getProviders')

    cy.visit('http://localhost:5173/provider-verification-system/')
    cy.wait('@getProviders')

    cy.get('section[aria-labelledby="api-heading"]').within(() => {
      cy.get('[role="alert"]')
        .should('be.visible')
        .and(
          'contain',
          'Unable to load providers. Check that the backend is running on port 3001.',
        )

      cy.contains('Loading providers…').should('not.exist')
      cy.get('table').should('not.exist')
    })

    cy.contains('h2', 'Applications').should('be.visible')
    cy.contains('td', 'Dr. Jordan Smith').should('be.visible')
  })
})