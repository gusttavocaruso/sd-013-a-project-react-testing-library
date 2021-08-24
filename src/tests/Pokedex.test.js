import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  test('Testa se existe um heading', () => {
    renderWithRouter(<App />);

    const getHeading = screen.getByRole('heading', {
      name: /encountered/i,
      level: 2,
    });
    expect(getHeading).toBeInTheDocument();
  });
  test('Testa se, ao clicar em "próximo", atualiza o pokemon exibido.', () => {
    renderWithRouter(<App />);

    const clickNext = screen.getByText(/próximo pokémon/i);
    const getPokemon = screen.getByTestId(/pokemon-name/i);
    expect(getPokemon.innerHTML).toBe('Pikachu');

    fireEvent.click(clickNext);

    const getPokemon2 = screen.getByTestId(/pokemon-name/i);
    expect(getPokemon2.innerHTML).toBe('Charmander');
  });
  test('Testa se exibe um pokemon por vez', () => {
    renderWithRouter(<App />);
    const clickNext = screen.getByText(/próximo pokémon/i);
    const getPokemon = screen.getAllByTestId('pokemon-name');
    expect(getPokemon.length).toEqual(1);

    fireEvent.click(clickNext);
    const getPokemon2 = screen.getAllByTestId('pokemon-name');
    expect(getPokemon2.length).toEqual(1);
  });
});
describe('Verifica os botões', () => {
  test('Testa se existem botões de filtragem por tipo', () => {
    renderWithRouter(<App />);

    const getAllButtonTypes = screen.getAllByTestId('pokemon-type-button');
    getAllButtonTypes.forEach((button, i) => {
      const types = ['Electric', 'Fire', 'Bug',
        'Poison', 'Psychic', 'Normal', 'Dragon'];
      expect(getAllButtonTypes[i]).toHaveTextContent(types[i]);
      expect(button.innerHTML).toBe(types[i]);
    });
  });
  test('Todos os resultados da pesquisa precisam ser pareados com o botão', () => {
    renderWithRouter(<App />);
    const getAllButtonTypes = screen.getAllByTestId('pokemon-type-button');
    const types = ['Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];

    getAllButtonTypes.forEach((button, i) => {
      const testingMatch = !!button.innerHTML.includes(types);
      const testingMatch2 = !!button.innerHTML.includes(types[i]);
      expect(testingMatch).toBe(false);
      expect(testingMatch2).toBe(true);
    });

    getAllButtonTypes.forEach((button, i) => {
      const type = ['Electric', 'Fire', 'Bug', 'Poison',
        'Psychic', 'Psychic', 'Fire', 'Normal', 'Dragon'];
      const clickNext = screen.getByText(/próximo pokémon/i);
      const getPokemon = screen.getByTestId('pokemon-type');

      expect(getPokemon.innerHTML).toBe(type[i]);
      fireEvent.click(clickNext);
    });
  });
  test('Testa se existe o botão ALL', () => {
    renderWithRouter(<App />);

    const getButton = screen.getByText('All');
    expect(getButton).toBeInTheDocument();
  });
  test('Testa se, ao clicar no botão All, reseta a pesquisa', () => {
    renderWithRouter(<App />);

    const clickNext = screen.getByText(/próximo pokémon/i);
    const getPokemon = screen.getByTestId('pokemon-type');
    const getButton = screen.getByText('All');

    fireEvent.click(clickNext);
    fireEvent.click(clickNext);
    fireEvent.click(clickNext);
    fireEvent.click(clickNext);
    expect(getPokemon.innerHTML).toBe('Psychic');

    fireEvent.click(getButton);
    expect(getPokemon.innerHTML).toBe('Electric');
  });
});
