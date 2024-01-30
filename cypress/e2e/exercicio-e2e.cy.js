/// <reference types="cypress" />
import {faker} from '@faker-js/faker';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo toda opções no checkout
        E validando minha compra ao final */

     afterEach(() => {
          cy.screenshot()  
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        var quantidade = 4
        var nome = faker.person.firstName()
        var sobrenome = faker.person.lastName()
        var email = faker.internet.email(nome)
        // Deve visitar a página de produtos Ebac Shop e clicar no produto desejado
        cy.visit('produtos')
        cy.get('.product-block')
             .first()
             .click()
        // Deve selecionar tamanho, cor e a quantidade desejada do produto escolhido
        cy.get('.button-variable-item-L').click()
        cy.get('.button-variable-item-Red').click()
        cy.get('.input-text').clear().type(quantidade)
        // Deve adicionar os produtos ao carrinho de compras da loja e validar se os itens foram adicionados ao carrinho corretamente
        cy.get('.single_add_to_cart_button').click()
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Abominable Hoodie” foram adicionados no seu carrinho.')
        // Deve Visitar o carrinho de compras e avançar para a página de Checkout
        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()
        //Deve preencher todos os campos com os dados cadastrais da Página de Checkout da Ebac Shop
        cy.get('#billing_first_name').type(nome)
        cy.get('#billing_last_name').type(sobrenome)
        cy.get('#billing_company').type('EBAC')
        //cy.get('#select2-billing_country-container')
        cy.get('#billing_address_1').type('Rua Bonfim')
        cy.get('#billing_city').type('Ibirité')
        //cy.get('#select2-billing_state-container')
        cy.get('#billing_postcode').type(32415445)
        cy.get('#billing_phone').type(31973620799)
        cy.get('#billing_email').type(email)
        cy.get('#createaccount').check()
        cy.get('#account_password').type('teste@123')
        cy.get('#payment_method_cod').check()
        cy.get('#terms').check()
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });

})
