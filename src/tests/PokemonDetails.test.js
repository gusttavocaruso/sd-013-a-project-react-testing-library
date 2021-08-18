import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Componente <PokemonDetails />', () => {
  test('informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const { history } = renderWithRouter(
      <App />,
    );

    const { id, name, summary } = pokemons[0];
    history.push(`/pokemons/${id}`);

    const nameElement = screen.getByText(`${name} Details`);
    expect(nameElement).toBeInTheDocument();

    const summaryHead = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summaryHead).toBeInTheDocument();
    expect(summaryHead.textContent).toBe('Summary');

    const summaryText = screen.getByText(summary);
    expect(summaryText).toBeInTheDocument();
  });

  test('existe na página uma seção com os mapas contendo as localizações', () => {
    const { history } = renderWithRouter(
      <App />,
    );

    const { id, name, foundAt } = pokemons[0];
    history.push(`/pokemons/${id}`);

    const locationsHead = screen.getByRole('heading', {
      name: `Game Locations of ${name}`,
      level: 2,
    });
    expect(locationsHead).toBeInTheDocument();

    const mapsImgs = screen.getAllByAltText(`${name} location`);
    foundAt.forEach((locInfo, index) => {
      expect(mapsImgs[index]).toBeInTheDocument();
      expect(mapsImgs[index].src).toBe(locInfo.map);
    });
  });

  test('o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(
      <App />,
    );

    const { id } = pokemons[0];
    history.push(`/pokemons/${id}`);

    const checkbox = screen.getByLabelText(/pokémon favoritado/i);
    expect(checkbox).toBeInTheDocument();
  });
});
