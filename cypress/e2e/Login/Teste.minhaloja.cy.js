// cypress/e2e/realizar_compra.cy.js
import { faker } from '@faker-js/faker';

describe('Realizando compra com sucesso', () => {
  it('Fluxo de compra E2E', () => {
    // Gera dados aleatórios
    const primeiroNome = faker.person.firstName();
    const sobrenome = faker.person.lastName();
    // Garantir email único com timestamp para evitar colisões
    const email = `${primeiroNome.toLowerCase()}.${sobrenome.toLowerCase()}.${Date.now()}@example.com`;
    const senha = faker.internet.password(10);

    // 1) Acessa site e vai para a área de cadastro
    cy.visit('http://www.automationpractice.pl/index.php');
    cy.get('a.login').click();

    // 2) Iniciar criação de conta
    cy.get('#email_create').type(email);
    cy.get('#SubmitCreate').click();

    // Espera o formulário de criação aparecer
    cy.get('#account-creation_form', { timeout: 10000 }).should('be.visible');

    // 3) Preencher cadastro (nome, sobrenome, senha, data de nascimento opcional)
    cy.get('#id_gender1').click();
    cy.get('#customer_firstname').clear().type(primeiroNome);
    cy.get('#customer_lastname').clear().type(sobrenome);
    cy.get('#passwd').type(senha);

    // Seleciona data (opcional)
    cy.get('#days').select('27');
    cy.get('#months').select('8');
    cy.get('#years').select('1998');

    // Submeter cadastro
    cy.get('#submitAccount').click();

    // Verifica que entrou na conta
    cy.contains('My account').should('be.visible');

    // 4) Logout e login novamente (verifica credenciais)
    cy.get('a.logout').click();
    cy.get('a.login').click(); // volta pra tela de login
    cy.get('#email').type(email);
    cy.get('#passwd').type(senha);
    cy.get('#SubmitLogin').click();
    cy.contains('My account').should('be.visible');
    

    // 5)  Acessando lista de produtos
    
     cy.contains('a.sf-with-ul', 'Women')
    .should('be.visible')
    .click()

    // 6) Clicando no produto 
     
   cy.get('.product-container .lnk_view')
    .eq(4) // 5º produto
    .should('be.visible')
    .click()
     

    // 7) Escolhendo tamanho e cor
    cy.get('select#group_1').select('M')
    cy.get('[name="Blue"]').click()
    cy.contains('In stock').should('be.visible')
    cy.contains('Add to car').should('be.visible')
   // cy.get('#bigpic').click()
   // cy.get('a.fancybox-close').click()
   
    // 8) Adicionando ao carrinho
    cy.get('#add_to_cart button')
    .should('be.visible')
   .click()
    cy.get('a[title="Proceed to checkout"]')
  .should('be.visible')
  .click()


   // 9) Validando Carrinho
   cy.contains('Shopping-cart summary').should('be.visible')
   cy.contains('p.product-name a', 'Printed Summer Dress')
   cy.contains('In stock').should('be.visible')
   cy.get('#total_product')
  .should('be.visible')
  .and('contain.text', '$29')
  cy.get('#total_shipping')
  .should('be.visible')
  .and('contain.text', '$7')
   cy.get('#total_price_container')
  .should('be.visible')
  .and('contain.text', '$36')


  // 10 ) Avançando para checkout

    cy.get('a.standard-checkout').click()
    cy.contains('Your addresses').should('be.visible')
  // 11) Realizando checkout
    cy.get('#company').type('Empresa teste')
    cy.get('#address1').type('Avenida inocencio serafico')
    cy.get('#city').type('Osasco')
    cy.get('#id_state').select('Texas')
    cy.get('#postcode').type('06386')
    cy.get('#id_country').type('United States')
    cy.get('#phone').type('(11)90000-0000')
    cy.get('#phone_mobile').type('(11)90000-0000')
    cy.get('#other').type('Apenas testando esse campo')
    cy.get('#alias').type('My address')
    
    // 12) Salvando Checkout
    cy.get('#submitAddress').click()
    
    // 13) Confirmando dados de endereço
    cy.contains('Address').should('be.visible')
    cy.contains('Avenida inocencio serafico').should('be.visible')
    cy.contains('Osasco, Texas 06386').should('be.visible')
    cy.contains('United States').should('be.visible')
    cy.get('#ordermsg').type('Testando esse campo')
    cy.get('button[name="processAddress"]').click()

   // 14)Confirmando dados de envio
    cy.get('h1.page-heading')
  .should('be.visible')
  .and('contain.text', 'Shipping:')
    cy.contains('My carrier').should('be.visible')
   cy.contains('Delivery time: Delivery next day!').should('be.visible')
   cy.get('.delivery_option_price')
  .should('be.visible')
  .and('contain.text', '$7')
   cy.get('#cgv').click()

   // 15) Avançando para pagamento
   cy.get('button[name="processCarrier"]').click()

   // 16) Pagamento

   cy.contains('Please choose your payment method').should('be.visible')
   cy.contains('Your shopping cart contains: 1 product').should('be.visible')
   cy.get('a.bankwire').click()
   cy.contains('Bank-wire payment').should('be.visible')
   cy.get('button.button.btn.btn-default.button-medium').click()

   // 17) Confirmando pedido
   cy.contains('Your order on My Shop is complete.').should('be.visible')

  


  });
});



