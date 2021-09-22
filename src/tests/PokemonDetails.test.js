import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('PokemonDetails', () => {
  beforeEach(() => { renderWithRouter(<App />); });
  const {
    name,
    foundAt,
    summary,
  } = pokemons[0];

  test('Testa se informações detalhadas do Pokémon selecionado são mostradas', () => {
    const linkDetalhes = screen.getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(linkDetalhes);
    expect(screen.getByText(`${name} Details`)).toBeInTheDocument();
    expect(linkDetalhes).not.toBeInTheDocument();

    const textSumary = screen.getByRole('heading', {
      name: /Summary/i,
      level: 2,
    });
    expect(textSumary).toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
  });

  test('Testa se existe na uma seção com os mapas e as localizações do pokémon', () => {
    const linkDetalhes = screen.getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(linkDetalhes);
    const textLocation = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    });
    expect(textLocation).toBeInTheDocument();

    foundAt.forEach((found, index) => {
      const imgLocation = screen.getAllByRole('img', {
        name: `${name} location`,
      });
      expect(imgLocation[index]).toHaveAttribute('src', found.map);
      expect(imgLocation[index]).toHaveAttribute('alt', `${name} location`);
    });
  });

  test('Teste se o usuário pode favoritar um pokémon na página de detalhes.', () => {
    const linkDetalhes = screen.getByRole('link', {
      name: /More details/i,
    });
    fireEvent.click(linkDetalhes);

    const checkFavorite = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    fireEvent.click(checkFavorite);
    const imgStar = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(imgStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
