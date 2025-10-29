///<reference types="Cypress"/>

Cypress.Commands.add('VerificaProdutos',()=>{
  cy.get('#item_2_title_link .inventory_item_name').should('have.text', 'Sauce Labs Onesie')
  cy.get('#item_0_title_link .inventory_item_name').should('have.text', 'Sauce Labs Bike Light')
  cy.get('#item_1_title_link .inventory_item_name').should('have.text', 'Sauce Labs Bolt T-Shirt')
})
