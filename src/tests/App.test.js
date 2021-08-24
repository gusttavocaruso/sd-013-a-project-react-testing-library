import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Checks if the App.js is working properly.', () => {
  it('Check the navigation bar links as instructed in the READ.ME file.', () => {
    renderWithRouter(<App />);
    // Catches the Home link.
    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    // It expects the Home link to be in the document.
    expect(homeLink).toBeInTheDocument();
    // Catches the About link.
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    // It expects the About link to be in the document.
    expect(aboutLink).toBeInTheDocument();
    // Catches the Favorite Pokémons link.
    const FavoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    // It expects the Favorite Pokémons link to be in the document.
    expect(FavoriteLink).toBeInTheDocument();
  });
  it('Check if the user is redirected to "/" URL path by clicking on Home.', () => {
    // Catches the renderWithRouter history property so we can use it later.
    const { history } = renderWithRouter(<App />);
    // By using the history.push method, we insert the "/" URL path into history memory.
    history.push('/');
    // Catches the Home link.
    const homeLink = screen.getByRole('link', {
      name: 'Home',
    });
    // Simulates a click event on the Home link by using the "fireEvent.click" method and informing it the const that we just declared above.
    fireEvent.click(homeLink);
    // Compares the navbar with the path desired by the user.
    expect(history.location.pathname).toBe('/');
  });
  it('Check if the user is redirected to "/about" URL path by clicking on About', () => {
    // Catches the renderWithRouter history property so we can use it later.
    const { history } = renderWithRouter(<App />);
    // By using the history.push method, we insert the "/about" URL path into history memory.
    history.push('/about');
    // Catches the About link.
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    // Simulates a click event on the Home link by using the "fireEvent.click" method and informing it the const that we just declared above.
    fireEvent.click(aboutLink);
    // Compares the navbar with the path desired by the user.
    expect(history.location.pathname).toBe('/about');
  });
  it('Check if the user is redirected to "/favorites"', () => {
    // Catches the renderWithRouter history property so we can use it later.
    const { history } = renderWithRouter(<App />);
    // By using the history.push method, we insert the "/about" URL path into history memory.
    history.push('/favorites');
    // Catches the Favorites link.
    const FavoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    // Simulates a click event on the Home link by using the "fireEvent.click" method and informing it the const that we just declared above.
    fireEvent.click(FavoriteLink);
    // Compares the navbar with the path desired by the user.
    expect(history.location.pathname).toBe('/favorites');
  });
  it('Checks if user is redirect to error page', () => {
    // Catches the renderWithRouter history property so we can use it later.
    const { history } = renderWithRouter(<App />);
    // By using the history.push method, we insert a nonexistent path into history memory.
    history.push('/nonexistent-page');
    expect(history.location.pathname).toBe('/nonexistent-page');
  });
});
