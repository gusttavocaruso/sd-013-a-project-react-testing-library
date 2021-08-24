import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testes do componente <Pokemon />', () => {
  it('Verifica se é renderizado um card com as informações de um Pokémon', () => {
    renderWithRouter(<App />);
    const eletricPokeBtn = screen.getByRole('button', { name: /electric/i });
    userEvent.click(eletricPokeBtn);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImg = screen.getByRole('img', { name: /pikachu/i });
    expect(pokemonName.innerHTML).toBe('Pikachu');
    expect(pokemonType.innerHTML).toBe('Electric');
    expect(pokemonWeight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });
  it('Verifica se o card possui um link "More details"', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByText('More details');
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails).toHaveAttribute('href', '/pokemons/25');
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
    const headingDetails = screen.getByRole('heading', { name: /pikachu details/i });
    expect(headingDetails).toBeInTheDocument();
  });
  it('Verifica se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByText('More details');
    userEvent.click(linkDetails);
    const favoriteCheck = screen.getByRole('checkbox', { name: /pokémon/i });
    userEvent.click(favoriteCheck);
    const favoriteIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
