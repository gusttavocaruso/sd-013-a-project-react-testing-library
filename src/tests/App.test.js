import React from 'react';
import { screen } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testar o App.js', () => {
  it('Teste se contém os links de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorite).toBeInTheDocument();
  });
  it('Teste se é redirecionada para pág. inicial ao clicar no link Home barra navegação.',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/');
      fireEvent.click(screen.getByRole('link', { name: 'Home' }));
      expect(history.location.pathname).toBe('/');
    });
  it('Teste se é redirecionada à pág. About ao clicar no link About barra de navegação.',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/about');
      fireEvent.click(screen.getByRole('link', { name: 'About' }));
      expect(history.location.pathname).toBe('/about');
    });
  it('Teste se é redirecionada à Pokémons Favoritados, ao clicar link Favorite Pokémons.',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/favotites');
      fireEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
      expect(history.location.pathname).toBe('/favorites');
    });
  it('Teste se é redirecionada à página Not Found ao entrar em uma URL desconhecida.',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/nao-encontrada');
      expect(history.location.pathname).toBe('/nao-encontrada');
    });
});
