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
