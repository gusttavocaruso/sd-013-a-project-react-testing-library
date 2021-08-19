import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste de Links', () => {
  it('teste Home', () => {
    renderWithRouter(<App />);
    const PageLink = screen.getByRole('link', { name: /home/i });
    expect(PageLink).toBeInTheDocument();
    userEvent.click(PageLink);
    const homePage = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(homePage).toBeInTheDocument();
  });
  it('checagem About', () => {
    renderWithRouter(<App />);
    const PageLink = screen.getByRole('link', { name: /about/i });
    expect(PageLink).toBeInTheDocument();
    userEvent.click(PageLink);
    const aboutPage = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(aboutPage).toBeInTheDocument();
  });
  it('checagem Pokémons Favoritados', () => {
    renderWithRouter(<App />);
    const PageLink = screen.getByRole('link', { name: /Favorite pokémons/i });
    expect(PageLink).toBeInTheDocument();
    userEvent.click(PageLink);
    const favoritePage = screen.getByRole('heading', {
      name: /Favorite pokémons/i,
      level: 2,
    });
    expect(favoritePage).toBeInTheDocument();
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
