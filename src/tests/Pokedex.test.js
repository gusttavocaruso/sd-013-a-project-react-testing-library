import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

import pokemons from '../data';

// Devido erros de lint teve que ser criado estas constantes pois são utilizadas algumas vezes no projeto
const nameTestId = 'pokemon-name';
const typeTestId = 'pokemon-type';
const typeButtonTestId = 'pokemon-type-button';

// Guarda na variável os types do pokemons percorrendo pelo map
const pokemonTypes = pokemons.map((pokemon) => pokemon.type);

// Cria na constante uniquePokemonTypes um array de tipos de pokemon, tirando os valores repetidos.
const uniquePokemonTypes = [...new Set(pokemonTypes)];

describe('Requisito 05 - Teste o componente <Pokedex.js />', () => {
  describe('Testa o heading da página', () => {
    test('Testa se página contém um h2 com o texto Encountered pokémons', () => {
      // Renderizo na tela as rotas do componente App.
      renderWithRouter(<App />);
      // Busca na tela se há um heading(h1,h2,h3...) com name "Encountered pokémons"
      const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
      // Verifica se o elemento que está na h2 está no documento
      expect(h2).toBeInTheDocument();
    });
  });

  describe('Testa se exibe o próximo Pokémon se Próximo pokémon é clicado', () => {
    test('O botão deve conter o texto Próximo pokémon', () => {
      // Renderizo na tela as rotas do componente App.
      renderWithRouter(<App />);
      // Busca elemento button com name "Próximo pokémon"
      const nextPkmBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
      // Testa se o elemento acima buscado está no documento
      expect(nextPkmBtn).toBeInTheDocument();
    });


    test('Os próximos Pokémons são mostrados, um a um, ao clicar sucessivamente no botão',
      () => {
        // Renderizo na tela as rotas do componente App.
        renderWithRouter(<App />);
        // Busca elemento button com name "Próximo pokémon"
        const nextPkmBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
        // Através da importação de dados de pokemons na "pokemons" faço um foreach para ler cada um dos pokemons
        getAllPokemons(nextPkmBtn);
      });

      test('O primeiro Pokémon deve ser mostrado se estiver no último Pokémon da lista',
      () => {
        // Renderizo na tela as rotas do componente App.
        renderWithRouter(<App />);
        const nextPkmBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
        // Percorro a lista de pokemons
        pokemons.forEach(() => {
          // Simulo o click no botão de próximo pokemon
          userEvent.click(nextPkmBtn);
        });
        // através do data-test-id pega o elemento com o name abaixo
        const firstPokemon = screen.getByTestId(nameTestId);
        // Testa se o pokemon pego acima tem a mesma descrição do primeiro pokemon a ser pego no foreach acima
        expect(firstPokemon).toHaveTextContent(pokemons[0].name);
      });
  });
