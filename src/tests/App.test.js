import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Tests app.js component', () => {
  it('Checks the links in the navbar', () => {
    renderWithRouter(<App />);
    // Catches the home link
    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    expect(homeLink).toBeInTheDocument();
    // Catches the about link
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    expect(aboutLink).toBeInTheDocument();
    // Catches the Favorite Pokémons link
    const FavoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(FavoriteLink).toBeInTheDocument();
  });
  it('Checks if user is redirect to / by clicking Home', () => {
    const { history } = renderWithRouter(<App />);
    // inserts / path into history
    history.push('/');
    // Catches the home link
    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    // Clicks on the Home
    fireEvent.click(homeLink);
    // Compares navbar to path desired
    expect(history.location.pathname).toBe('/');
  });
  it('Checks if user is redirect to /about by clicking About', () => {
    const { history } = renderWithRouter(<App />);
    // inserts /about path into history
    history.push('/about');
    // Catches the about link
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    // Clicks on the Home
    fireEvent.click(aboutLink);
    // Compares navbar to path desired
    expect(history.location.pathname).toBe('/about');
  });
  it('Checks if user is redirect to /favorites by clicking Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    // inserts /favorites path into history
    history.push('/favorites');
    // Catches the favorites link
    const FavoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    // Clicks on the Home
    fireEvent.click(FavoriteLink);
    // Compares navbar to path desired
    expect(history.location.pathname).toBe('/favorites');
  });
  it('Checks if user is redirect to error page', () => {
    const { history } = renderWithRouter(<App />);
    // inserts nonexistent path into history
    history.push('/jay-z-the-goat');
    const { pathname } = history.location;
    expect(pathname).toBe('/jay-z-the-goat');
    const notFoundMessage = 'Page requested not found Crying emoji';
    const notFoundElement = screen.getByRole('heading', {
      name: notFoundMessage,
      level: 2,
    });
    expect(notFoundElement).toBeInTheDocument();
  });
});
