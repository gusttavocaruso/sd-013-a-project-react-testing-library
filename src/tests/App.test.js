import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
// uso do regex //i
// uso do location
describe('Testar se a aplicação contém um conjunto fixo de links de navegação', () => {
  test('Testa se renderiza a home', () => {
    // rederizar a pagina
    const { history } = renderWithRouter(<App />);
    // pegando a home
    const pageHome = screen.getByRole('link', { name: /Home/i });
    // testando o evento
    userEvent.click(pageHome);
    expect(history.location.pathname).toBe('/');
  });

  test('Testa se renderiza About', () => {
    const { history } = renderWithRouter(<App />);
    const pageAbout = screen.getByRole('link', { name: /About/i });
    userEvent.click(pageAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('Testa se renderiza Favorite Pokemons', () => {
    const { history } = renderWithRouter(<App />);
    const pageFavorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(pageFavorite);
    expect(history.location.pathname).toBe('/favorites');
  });
});
