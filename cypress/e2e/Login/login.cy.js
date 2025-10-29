///<reference types="Cypress"/>


describe('E2E - Realizando compra com sucesso', () => {
    it('Fluxo compra de produtos', () => {
        
        cy.login_teste('standard_user','secret_sauce')
       
        cy.get('[data-test="title"]').should('contain', 'Products')
       
       // Ordenar menor por maior valor

       cy.get('[data-test="product-sort-container"]').select('Price (low to high)')
    
       // Validação da ordenação dos produtos
       cy.get('#item_2_title_link').should('contain', 'Sauce Labs Onesie')
       cy.get('#item_0_title_link').should('contain', 'Sauce Labs Bike Light')
       cy.get('#item_1_title_link').should('contain', 'Sauce Labs Bolt T-Shirt')

       

      // Adicionando ao carrinho
      cy.contains('Sauce Labs Onesie').click()
      cy.get('.btn_primary').click()
      cy.get('#back-to-products').click()


      cy.contains('Sauce Labs Bike Light').click()
      cy.get('.btn_primary').click()
      cy.get('#back-to-products').click()

       cy.contains('Sauce Labs Bolt T-Shirt').click()
      cy.get('.btn_primary').click()
      cy.get('#back-to-products').click()


      // Checagem da quantidade de produtos adciocinados  no carrinho

      cy.get('.shopping_cart_link').should('have.text','3')
      
      //check carrinho 

       cy.get('.shopping_cart_link').click()

       cy.VerificaProdutos()
    
      // checkout

      cy.get('#checkout').click()

      cy.get('#first-name').type('Roberto')
      cy.get('#last-name').type('Mares')
      cy.get('#postal-code').type('06364-152')
      cy.get('#continue').click()
      
      // Verificando produtos do carrinho
       
      cy.VerificaProdutos()


      // Checagem valor total do carrinho

      cy.get('[data-test="total-label"]')
      .should('have.text', 'Total: $36.69')
     
      // Finish

      cy.get('#finish').click()
      cy.get('[data-test="complete-header"]')
      .should('contain.text', 'Thank you')

    });




});