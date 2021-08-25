import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa se o pokemon mostrado é o correto', () => {
  test('Teste se é renderizado um card com as informações', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Home'));
    const pokemon1 = screen.getByText('Pikachu');
    const type1 = screen.getByTestId('pokemon-type');
    const weight = screen.getByText('Average weight: 6.0 kg');
    expect(pokemon1).toBeInTheDocument();
    expect(type1.innerHTML).toBe('Electric');
    expect(weight).toBeInTheDocument();

    const img = screen.getByAltText('Pikachu sprite');
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Testa se tem um link', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(link).toBeInTheDocument();
    fireEvent.click(link);
    const pikachu = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    expect(pikachu).toBeInTheDocument();
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Testa icone de favorito', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const label = screen.getByLabelText(/Pokémon favoritado?/i);
    fireEvent.click(label);
    history.push('/');
    const img = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(img.src).toContain('/star-icon.svg');
  });
});
