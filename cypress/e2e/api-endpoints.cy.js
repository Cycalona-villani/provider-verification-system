describe('Provider API endpoints', () => {
    // Use the local API URL for testing in development, and the deployed API URL for CI/CD
  const apiUrl = 'http://localhost:3001'
  // Test local backend API during development, and the deployed backend API during CI/CD
  //const apiUrl = 'https://provider-onboarding-api.onrender.com'

  it('returns a healthy service status', () => {
    cy.request(`${apiUrl}/api/health`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.headers['content-type']).to.include(
        'application/json',
      )
      expect(response.body.status).to.eq('ok')
      expect(response.body.service).to.eq('Provider Onboarding API')
    })
  })

  it('returns provider records with the expected fields', () => {
    cy.request(`${apiUrl}/api/providers`).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.be.an('array').and.not.be.empty

      response.body.forEach((provider) => {
        expect(provider).to.include.all.keys(
          'id',
          'name',
          'specialty',
          'state',
          'licenseStatus',
          'onboardingStatus',
        )

        expect(provider.id).to.be.a('number')
        expect(provider.name).to.be.a('string').and.not.be.empty

        expect(provider.licenseStatus).to.be.oneOf([
          'active',
          'expired',
          'suspended',
        ])

        expect(provider.onboardingStatus).to.be.oneOf([
          'pending',
          'in_review',
          'approved',
        ])
      })
    })
  })

  it('returns 404 for an unknown API route', () => {
    cy.request({
      url: `${apiUrl}/api/does-not-exist`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })
})