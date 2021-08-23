import React from 'react';
import { screen, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Pokemon from './Pokemon.test';

describe('Teste o componente "<Pokemon.js />"', () => {
  describe('Teste se é renderizado um card com as informações de determinado'
  + ' pokémon.', () => {
    it('O nome correto do Pokémon deve ser mostrado na tela.', () => {

    });
    it('O tipo correto do pokémon deve ser mostrado na tela.', () => {

    });
    it('O peso médio do pokémon deve ser exibido com um texto no formato Average weight:'
    + ' <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente,'
    + ' o peso médio do pokémon e sua unidade de medida.', () => {

    });
    it('A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL'
    + ' da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do'
    + ' pokémon.', () => {

    });
  });

  describe('Teste o card do Pokémon.', () => {
    it('Contém um link de navegação para exibir detalhes deste Pokémon.O link deve'
    + ' possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido.', () => {
    });
  });

  describe('Teste quando clicar no link de navegação do Pokémon.', () => {
    it('Redirecionamento da aplicação para a página de detalhes de'
    + ' Pokémon.', () => {

    });
  });

  describe('Teste se a URL exibida no navegador muda.', () => {
    it('Para /pokemon/<id>, onde <id> é o id do Pokémon.', () => {

    });
  });

  describe('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    it('O ícone deve ser uma imagem com o atributo src contendo o caminho'
  + ' /star-icon.svg;', () => {

    });
    it('A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite,'
    + ' onde <pokemon> é o nome do Pokémon exibido.', () => {

    });
  });
});
