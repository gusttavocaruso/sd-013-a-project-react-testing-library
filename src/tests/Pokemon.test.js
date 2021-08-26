import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokename = screen.getByTestId('pokemon-name');
    expect(pokename.innerHTML).toBe('Pikachu');

    const typePoke = screen.getByTestId('pokemon-type');
    expect(typePoke.innerHTML).toBe('Electric');

    const weightPoke = screen.getByTestId('pokemon-weight');
    expect(weightPoke.innerHTML).toBe('Average weight: 6.0 kg');

    const imgPoke = screen.getByAltText('Pikachu sprite');
    expect(imgPoke).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPoke).toHaveAttribute('alt', 'Pikachu sprite');
  });
  it('Teste id do pokemon, clicar no link do Pokémon, é feito o redirecionamento', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByText(/more details/i);
    userEvent.click(details);
    const pokeUrl = history.location.pathname;
    expect(pokeUrl).toBe('/pokemons/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const details = screen.getByText(/more details/i);
    userEvent.click(details);
    const favoriClick = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(favoriClick);
    const favoriPoke = screen.getByRole('link', { name: /Favorite Pokémon/i });
    userEvent.click(favoriPoke);
    const pikachuStar = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(pikachuStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(pikachuStar).toHaveAttribute('src', '/star-icon.svg');
  });
});
