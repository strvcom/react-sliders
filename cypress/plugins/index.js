/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  config.env.webpackFilename = 'cypress/webpack.config.js'
  require('cypress-react-unit-test/plugins/load-webpack')(on, config)

  return config
}
