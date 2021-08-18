import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

// Guarda na variável pokemons a relação de pokemons do data.js
import pokemons from '../data';

// Guarda no firstPokemon o primeiro pokemon do array
const firstPokemon = pokemons[0];

describe('Requisito 07 - Teste o componente <PokemonDetails.js />', () => {
  describe('Teste se as informações detalhadas do Pokémon selecionado são mostradas',
    () => {
      test('A página deve conter um texto <name> Details', () => {
        // Renderizo na tela as rotas do componente App.
        renderWithRouter(<App />);
        // Simulo um click no elemento link com name/texto "more details".
        userEvent.click(screen.getByRole('link', { name: /more details/i }));
        // Procura um heading(h1,h2,h3...) com name/texto do primeiro pokemon pego pela variável que possui o primeiro pokemon do data.js
        const h2 = screen.getByRole('heading', { name: `${firstPokemon.name} Details` });
        // Testo se o elemento heading está no documento
        expect(h2).toBeInTheDocument();
      });

      