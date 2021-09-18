import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const { name, summary, foundAt } = pokemons[0];
const MORE_DETAILS = 'More details';

describe('Componente PokemonDetails', () => {
  test('Informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: MORE_DETAILS }));

    const pokemonName = screen.getByRole('heading', { name: `${name} Details` });
    expect(pokemonName).toBeInTheDocument();

    const detailsLink = screen.queryByRole('link', { name: 'More details' });
    expect(detailsLink).toBeFalsy();

    const h2 = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(h2).toBeInTheDocument();

    const summaryP = screen.getByText(summary);
    expect(summaryP).toBeInTheDocument();
  });

  test('Existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: MORE_DETAILS }));

    const h2 = screen.getByRole('heading', { name: `Game Locations of ${name}` });
    expect(h2).toBeInTheDocument();

    const locations = screen.getAllByAltText(`${name} location`);
    expect(locations).toHaveLength(foundAt.length);

    foundAt.forEach((location, index) => {
      const src = locations[index].src === location.map;
      expect(src).toBeTruthy();

      const locationText = screen.getByText(location.location);
      expect(locationText).toBeInTheDocument();
    });
  });

  test('Usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: MORE_DETAILS }));

    const favoriteCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteCheckbox).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).toBeChecked();

    userEvent.click(favoriteCheckbox);
    expect(favoriteCheckbox).not.toBeChecked();
  });
});
