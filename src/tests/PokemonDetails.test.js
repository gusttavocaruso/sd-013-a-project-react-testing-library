import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testando PokemonDetails.js', () => {
  const pokemon = pokemons[0];
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${pokemon.id}`);
  });
  test('se os detalhes do Pokémon selecionado são mostrados na tela', () => {
    const title = screen.getByRole('heading', { name: `${pokemon.name} Details` });
    expect(title).toBeDefined();

    const summaryTitle = screen.getByRole('heading', { name: 'Summary' });
    expect(summaryTitle).toBeDefined();
    expect(summaryTitle.textContent).toStrictEqual('Summary');

    const summary = screen.getByText('Summary');
    expect(summary).toBeDefined();

    const resumeSummary = screen.getByText(pokemon.summary);
    expect(resumeSummary).toBeDefined();
  });

  test('se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const mapTitle = screen
      .getByRole('heading', { name: `Game Locations of ${pokemon.name}` });
    expect(mapTitle).toBeInTheDocument();

    const mapImages = screen.getAllByRole('img');
    expect(mapImages[1]).toBeDefined();
    expect(mapImages[1].src).toStrictEqual(pokemon.foundAt[0].map);
    expect(mapImages[2].alt).toStrictEqual(`${pokemon.name} location`);

    expect(mapImages[2]).toBeDefined();
    expect(mapImages[2].src).toStrictEqual(pokemon.foundAt[1].map);
    expect(mapImages[2].alt).toStrictEqual(`${pokemon.name} location`);

    const mapDescription = screen.getByText(pokemon.foundAt[0].location);
    expect(mapDescription).toBeDefined();

    const mapDescription2 = screen.getByText(pokemon.foundAt[1].location);
    expect(mapDescription2).toBeDefined();
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const lableIsFavorite = screen.getByText('Pokémon favoritado?');
    expect(lableIsFavorite).toBeDefined();

    let isFavorite = screen.getByRole('checkbox', { checked: false });
    expect(isFavorite).toBeDefined();

    userEvent.click(isFavorite);

    isFavorite = screen.getByRole('checkbox', { checked: true });
    expect(isFavorite).toBeDefined();

    userEvent.click(isFavorite);

    isFavorite = screen.getByRole('checkbox', { checked: false });
    expect(isFavorite).toBeDefined();
  });
});
