///<reference types="Cypress"/>

Cypress.Commands.add('login_teste',(user,passaword)=>{

        cy.visit("https://www.saucedemo.com/")

        cy.get(cy.get('#user-name').type(user))
        cy.get('[data-test="password"]').type(passaword)
        cy.get('[data-test="login-button"]').click()
})