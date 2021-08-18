import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

// Busca a lista de pokemons
import pokemons from '../data';

// Para corrigir erros de lint foi criado as constantes abaixo apenas com nomes que campos do App para serem chamados no teste
const nameTestId = 'pokemon-name';
const typeTestId = 'pokemon-type';
const weightTestId = 'pokemon-weight';
const firstPokemon = pokemons[0]; // Pega o primeiro pokemon

describe('Requisito 06 - Testa o componente <Pokemon.js />', () => {
  describe('Teste se é renderizado um card com as informações de determinado pokémon',
    () => {
      test('O nome correto do Pokémon deve ser mostrado na tela', () => {
        // Renderizo na tela as rotas do componente App.
        renderWithRouter(<App />);
        // Guarda na variável pokemonName o elemento datatestId com 'pokemon-name'
        const pokemonName = screen.getByTestId(nameTestId);
        // Testo se o elemento que está na variável pokemonName possui o texto do primeiro pokemon
        expect(pokemonName).toHaveTextContent(firstPokemon.name);
      });

      test('O tipo correto do pokémon deve ser mostrado na tela', () => {
        // Renderizo na tela as rotas do componente App.
        renderWithRouter(<App />);
        // Guarda na variável pokemonType o elemento datatestId com 'pokemon-type'
        const pokemonType = screen.getByTestId(typeTestId);
        // Testo se o elemento que está na variável pokemonType possui o texto do primeiro pokemon
        expect(pokemonType).toHaveTextContent(firstPokemon.type);
      });
      
      test('O peso médio do pokémon deve ser exibido com um texto no formato correto',
        () => {
          // Renderizo na tela as rotas do componente App.
          renderWithRouter(<App />);
          // Guarda na variável abaixo o elemento que possui o datatestId 'pokemon-weight'
          const pokemonWeight = screen.getByTestId(weightTestId);
          // Testa se o elemento pego acima possui o conteúdo de "Average weight". O "/" é como se fosse uma procura com "%" e o "i" é case sensitive
          expect(pokemonWeight).toHaveTextContent(/Average weight:/i);
          // Desconstroi os dois itens do objeto averageWeight do data.js
          const { value, measurementUnit } = firstPokemon.averageWeight;
          // Testa se o elemento encontrado acima tem o conteúdo do "value" desconstruído acima
          expect(pokemonWeight).toHaveTextContent(value);
          // Testa se o elemento encontrado acima tem o conteúdo do "measurementUnit" desconstruído acima
          expect(pokemonWeight).toHaveTextContent(measurementUnit);
        });
