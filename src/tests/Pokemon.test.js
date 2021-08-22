import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Pokemons', () => {
  it('Checagem do primeiro Pokemon do tipo eletrico', () => {
    renderWithRouter(<App />); // seleciono o pokemon do typo eletrico e faço os teste esperando o pikachu
    const buttons = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(buttons[0]);
    const name = screen.getByTestId('pokemon-name');
    const type = screen.getByTestId('pokemon-type');
    const weight = screen.getByTestId('pokemon-weight');
    const img = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(name).toHaveTextContent(/pikachu/i);
    expect(type).toHaveTextContent(/electric/i);
    expect(weight).toHaveTextContent(/Average weight: 6.0 kg/i);
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Checagem do dados do Pokemon do tipo eletrico após o evento de click', () => {
    const { history } = renderWithRouter(<App />);
    const buttons = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(buttons[0]);
    const link = screen.getByRole('link', { name: /more details/i });
    expect(link).toHaveAttribute('href', '/pokemons/25');
    userEvent.click(link);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    userEvent.click(favorite);
    const image = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(image).toHaveAttribute('src', '/star-icon.svg');
  });
});
