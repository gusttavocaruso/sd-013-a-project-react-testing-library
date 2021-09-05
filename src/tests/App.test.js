import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from '../components/renderWithRouter';

describe('app.js Tests', () => {
  const pageFavorites = 'Favorite Pokémons';
  test('test the text of the links HOME, ABOUT, FAVORITE POKEMONS', () => {
    // Acess screen elements
    RenderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    const linkAbout = screen.getByRole('link', { name: 'About' });
    const linkFavorite = screen.getByRole('link', { name: pageFavorites });
    // Test
    expect(linkHome.textContent).toBe('Home');
    expect(linkAbout.textContent).toBe('About');
    expect(linkFavorite.textContent).toBe(pageFavorites);
  });
  test('test if clicking the home link redirects to the home page', () => {
    RenderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    const home = RenderWithRouter(<App />).history.location.pathname;
    expect(home).toStrictEqual('/');
  });
  test('test if clicking the about link redirects to the about page', () => {
    RenderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);
    const About = RenderWithRouter(<App />).history.location.pathname;
    expect(About).toStrictEqual('/');
  });
  test('test if clicking the FavoriteP link redirects to the FavoriteP page', () => {
    RenderWithRouter(<App />);
    const linkFavoriteP = screen.getByRole('link', { name: pageFavorites });
    userEvent.click(linkFavoriteP);
    const favoriteP = RenderWithRouter(<App />).history.location.pathname;
    expect(favoriteP).toStrictEqual('/');
  });
  test('tests whether entering an unknown url is redirected to the NotFound page', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/blablabla');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeDefined();
  });
});
