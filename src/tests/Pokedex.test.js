import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from './RenderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  test('Testa se Pokedex tem um heading h2 com o texto "Encountered pokémons"', () => {
    RenderWithRouter(<App />);

    const getHeading = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(getHeading).toBeInTheDocument();
  });

  // Teste feito com a ajuda de João Lima
  test('Testa se existe um botão Next e se ao clicar mostra o próximo pokemon ', () => {
    RenderWithRouter(<App />);

    const getButton = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    expect(getButton).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const getPokemonName = screen.getByTestId('pokemon-name');
      expect(getPokemonName).toHaveTextContent(pokemon.name);
      userEvent.click(getButton);
    });
  });

  test('Testa se é mostrado um pokemon por vez', () => {
    RenderWithRouter(<App />);

    const getPokemonByTestId = screen.getAllByTestId('pokemon-name');
    // clicar no botão
    expect(getPokemonByTestId.length).toBe(1);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    // const pokemonsData = pokemons;
    RenderWithRouter(<App />);

    const LENGTH_ALL_TYPES = 7;
    // Pegando todos os botões e fazendo um map para ver se cada um deles está na página
    const getButtonType = screen.getAllByTestId('pokemon-type-button');
    getButtonType.forEach((item) => expect(item).toBeInTheDocument());
    expect(getButtonType).toHaveLength(LENGTH_ALL_TYPES);
  });

  test('Testa se clicando no tipo apenas aquele tipo de pokemon aparece', () => {
    RenderWithRouter(<App />);
    const getButtonFilter = screen.getAllByTestId('pokemon-type-button');
    const getFireButton = getButtonFilter.find((button) => button.innerHTML === 'Fire');
    userEvent.click(getFireButton);
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Fire');
    const getButtonNext = screen.getByTestId('next-pokemon');
    userEvent.click(getButtonNext);
    expect(screen.getByTestId('pokemon-type').innerHTML).toBe('Fire');
  });

  test('Testa se a Pokédex tem o botão All', () => {
    RenderWithRouter(<App />);

    const getButtonAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(getButtonAll);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    RenderWithRouter(<App />);
    const getButtonAll = screen.getByRole('button', { name: 'All' });
    const withNoFilter = screen.getByText('Pikachu');
    userEvent.click(getButtonAll);
    expect(withNoFilter).toBeInTheDocument();
  });
});
