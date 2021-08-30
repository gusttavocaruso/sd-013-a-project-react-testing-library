import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testar topo da aplicação', () => {
  test('Teste se a aplicação é redirecionada para a página Home', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Home'));
    expect(history.location.pathname).toBe('/');
  });
  test('Teste se a aplicação é redirecionada para a página About', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('About'));
    expect(history.location.pathname).toBe('/about');
  });
  test('Teste se a aplicação é redirecionada para a página Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText('Favorite Pokémons'));
    expect(history.location.pathname).toBe('/favorites');
  });
});
