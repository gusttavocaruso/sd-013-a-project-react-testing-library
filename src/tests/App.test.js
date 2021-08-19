import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste de Links', () => {
  it('teste Home', () => {
    const { history } = renderWithRouter(<App />);
    const PageLink = screen.getByRole('link', { name: /home/i });
    expect(PageLink).toBeInTheDocument();
    userEvent.click(PageLink);
    const { location: { pathname } } = history;
    expect('/').toBe(pathname);
  });
  it('checagem About', () => {
    const { history } = renderWithRouter(<App />);
    const PageLink = screen.getByRole('link', { name: /about/i });
    expect(PageLink).toBeInTheDocument();
    userEvent.click(PageLink);
    const { location: { pathname } } = history;
    expect('/about').toBe(pathname);
  });
  it('checagem Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const PageLink = screen.getByRole('link', { name: /Favorite pokémons/i });
    expect(PageLink).toBeInTheDocument();
    userEvent.click(PageLink);
    const { location: { pathname } } = history;
    expect('/favorites').toBe(pathname);
  });
  it('Página não encontrada', () => {
    const { history } = renderWithRouter(<App />);
    history.push('xablau');
    const favoritePage = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(favoritePage).toBeInTheDocument();
  });
});
