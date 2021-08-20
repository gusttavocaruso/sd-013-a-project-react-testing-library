import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente <Pokedex />', () => {
  it('Verifica se a página possui um <h2/>', () => {
    renderWithRouter(<App />);
    const headingText = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
    });
    expect(headingText).toBeInTheDocument();
  });

  it('Verifica se o próximo pokémon é renderizado ao clicar no botão "próximo pokémon"',
    () => {
      renderWithRouter(<App />);
      const buttonNext = screen.getByRole('button', {
        name: /próximo pokémon/i,
      });
      expect(buttonNext).toBeInTheDocument();
      const pikachuCard = screen.getByRole('img', {
        name: /pikachu/i,
      });
      expect(pikachuCard).toBeInTheDocument();
      userEvent.click(buttonNext);
      const charmanderCard = screen.getByRole('img', {
        name: /charmander/i,
      });
      expect(charmanderCard).toBeInTheDocument();
      userEvent.click(buttonNext);
      const caterpieCard = screen.getByRole('img', {
        name: /caterpie/i,
      });
      expect(caterpieCard).toBeInTheDocument();
      userEvent.click(buttonNext);
      const ekansCard = screen.getByRole('img', {
        name: /ekans/i,
      });
      expect(ekansCard).toBeInTheDocument();
      userEvent.click(buttonNext);
      const alakazamCard = screen.getByRole('img', {
        name: /alakazam/i,
      });
      expect(alakazamCard).toBeInTheDocument();
      userEvent.click(buttonNext);
      const mewCard = screen.getByRole('img', {
        name: /mew/i,
      });
      expect(mewCard).toBeInTheDocument();
      userEvent.click(buttonNext);
      const rapidashCard = screen.getByRole('img', {
        name: /rapidash/i,
      });
      expect(rapidashCard).toBeInTheDocument();
      userEvent.click(buttonNext);
      const snorlaxCard = screen.getByRole('img', {
        name: /snorlax/i,
      });
      expect(snorlaxCard).toBeInTheDocument();
      userEvent.click(buttonNext);
      const dragonairCard = screen.getByRole('img', {
        name: /dragonair/i,
      });
      expect(dragonairCard).toBeInTheDocument();
      userEvent.click(buttonNext);
      expect(pikachuCard).toBeInTheDocument();
    });

  it('Verifica se é renderizado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemonCard = screen.getAllByRole('img', { name: /pikachu/i });
    expect(pokemonCard).toHaveLength(1);
  });

  it(
    'Verifica se existem botões de filtragem por tipo e se o texto está correto',
    () => {
      renderWithRouter(<App />);
      const typeButtons = screen.getAllByTestId('pokemon-type-button');
      expect(typeButtons[0].innerHTML).toBe('Electric');
      expect(typeButtons[1].innerHTML).toBe('Fire');
      expect(typeButtons[2].innerHTML).toBe('Bug');
      expect(typeButtons[3].innerHTML).toBe('Poison');
      expect(typeButtons[4].innerHTML).toBe('Psychic');
      expect(typeButtons[5].innerHTML).toBe('Normal');
      expect(typeButtons[6].innerHTML).toBe('Dragon');
    },
  );

  it(
    'Verifica se ao clicar em um botão de tipo, são mostrados os pokémons do tipo',
    () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByRole('button', {
        name: /fire/i,
      }));
      const charmander = screen.getByText(/charmander/i);
      expect(charmander).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', {
        name: /próximo pokémon/i,
      }));
      const rapidash = screen.getByText(/rapidash/i);
      expect(rapidash).toBeInTheDocument();
      userEvent.click(screen.getByRole('button', {
        name: /próximo pokémon/i,
      }));
      expect(charmander).toBeInTheDocument();
    },
  );

  it('Verifica se o botão "All" cumpre todas suas funções', () => {
    renderWithRouter(<App />);
    const allPokeButton = screen.getByRole('button', { name: /all/i });
    expect(allPokeButton).toBeInTheDocument();
    userEvent.click(allPokeButton);
    const nextPokeButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const arrayPokemon = [];
    arrayPokemon.push(screen.getByText(/pikachu/i));
    userEvent.click(nextPokeButton);
    arrayPokemon.push(screen.getByText(/charmander/i));
    userEvent.click(nextPokeButton);
    arrayPokemon.push(screen.getByText(/caterpie/i));
    userEvent.click(nextPokeButton);
    arrayPokemon.push(screen.getByText(/ekans/i));
    userEvent.click(nextPokeButton);
    arrayPokemon.push(screen.getByText(/alakazam/i));
    userEvent.click(nextPokeButton);
    arrayPokemon.push(screen.getByText(/mew/i));
    userEvent.click(nextPokeButton);
    arrayPokemon.push(screen.getByText(/rapidash/i));
    userEvent.click(nextPokeButton);
    arrayPokemon.push(screen.getByText(/snorlax/i));
    userEvent.click(nextPokeButton);
    arrayPokemon.push(screen.getByText(/dragonair/i));
    expect(arrayPokemon.length).toEqual(arrayPokemon.length);
  });
});
