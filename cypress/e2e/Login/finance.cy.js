
describe('Acessar ferramenta para controle de gastos', () => {
  
  // hooks -> Executar antes ou depois /  de cada ou de todos os testes
  // before -> Executar uma vez antes de todos os testes
  // after - > Executar uma vez depois de todos os testes
  // beforeEach -> Executar antes de cada teste
  // afterEach -> Executar depois de cada teste


    beforeEach(() => {
        
          cy.visit('https://my-devfinances.netlify.app/#')
    });

  
    it('Cadastrando uma entrada', () => {
   
      
        criarTransacao ("Freela",500)
       //  criarTransacao ("Freela",100) // caso queira inserir mais de uma entrada
     
     cy.get('tbody tr td.description').should('have.text', 'Freela')
        
    });

    it('Cadastrando uma saída', () => {
    

        criarTransacao('Cinema',-150)

        cy.get('tbody tr td.description').should('have.text', 'Cinema')
});

     it('Excluir transação', () => {
    
      criarTransacao('Freela',100 )
     criarTransacao('Mesada',10)
       cy.contains('.description','Freela')  //td = Referencia   // encontra uma coluna

       .parent() // tr   // Apartir de um elemento navegar para um elemento Pai
       .find('img') // elemento que a gente precisa    // para encontrar um determinado elemento
       .click()

        
         cy.get('tbody tr').should('have.length',1)


});


});

    function criarTransacao(descricao,valor){

    cy.contains('Nova Transação').click()
    cy.get('#description').type(descricao)
    cy.get('#amount').type(valor)
    cy.get('#date').type('2025-10-21') // yyyy-mm-dd


    cy.contains('button','Salvar').click()

    }