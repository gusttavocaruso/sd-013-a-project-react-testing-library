import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa se o componente pai tem links navegáveis com textos acertivos.', () => {
  it('Testa se o primeiro link existe e possui o texto Home', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
  });
  it('Testa se o segundo link existe e possui o texto About', () => {
    renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();
  });
  it('Testa se o terceiro link existe e possui o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorite).toBeInTheDocument();
  });
  it('Testa se ao clicar no link Home, ele redireciona para a página home.', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    fireEvent.click(home);
    expect(history.location.pathname).toBe('/');
  });
  it('Testa se ao clicar no link About, ele redireciona para a página sobre.', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });
    fireEvent.click(about);
    expect(history.location.pathname).toBe('/about');
  });
  it('Testa se ao clicar no terceiro link, ele redireciona para a página de correta.',
    () => {
      const { history } = renderWithRouter(<App />);
      const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
      fireEvent.click(favorite);
      expect(history.location.pathname).toBe('/favorites');
    });
  it('Testa se ao inserir um url qualquer, vai para a página not found.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
    const text = screen.getByText(/page requested not found/i);
    expect(text).toBeInTheDocument();
  });
});
