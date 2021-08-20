import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes para PokemonDetails', () => {
  it('Verifica se renderiza um card com as informações do pokemon', () => {
    renderWithRouter(<App />);

    const pokeName = screen.getByTestId('pokemon-name');
    expect(pokeName).toBeInTheDocument();
    expect(pokeName.innerHTML).toBe('Pikachu');

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType.innerHTML).toBe('Electric');

    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toBeInTheDocument();
    expect(weight.innerHTML).toBe('Average weight: 6.0 kg');

    const image = screen.getByAltText('Pikachu sprite');
    expect(image).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(image).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Verifica se redireciona para "/pokemons/id" ao clicar ', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('ícone de estrela no poḱemon favoritado', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    userEvent.click(moreDetails);
    const fav = screen.getByRole('checkbox');
    userEvent.click(fav);
    const img = screen.getByAltText('Pikachu is marked as favorite');
    expect(img)
      .toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
