import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RouterRender from './RouterRender';

describe('Testing App.js', () => {
  describe('Tests if Home, About and Favorite navbar links exist', () => {
    it('Tests if there is a fixed set of links: "Home", "About", "Favorite"', () => {
      RouterRender(<App />);

      const getAllLinks = screen.getAllByRole('link');
      expect(getAllLinks[0]).toHaveTextContent('Home');
      expect(getAllLinks[1]).toHaveTextContent('About');
      expect(getAllLinks[2]).toHaveTextContent('Favorite Pokémons');
    });
  });
});

describe('Tests the behavior of links', () => {
  let setHistory;
  beforeEach(() => {
    setHistory = RouterRender(<App />).history;
  });
  it('Tests if when clicked "Home" it will be redirected to /', () => {
    const getHomeLink = screen.getByRole('link', { name: 'Home' });
    expect(getHomeLink.innerHTML).toStrictEqual('Home');

    userEvent.click(getHomeLink);
    const homePage = setHistory.location.pathname;
    expect(homePage).toStrictEqual('/');
  });
  it('Tests if when clicked "About" it will be redirected to /about', () => {
    const getAboutLink = screen.getByRole('link', { name: 'About' });
    expect(getAboutLink.innerHTML).toStrictEqual('About');

    userEvent.click(getAboutLink);
    const aboutPage = setHistory.location.pathname;
    expect(aboutPage).toStrictEqual('/about');
  });
  it('Tests if when clicked "Favorite Pokémons" it will be redirected to /favorites',
    () => {
      const getFavoritesLink = screen.getByRole('link', { name: /Favorite Pokémons/ });
      expect(getFavoritesLink.innerHTML).toStrictEqual('Favorite Pokémons');

      userEvent.click(getFavoritesLink);
      const favoritesPage = setHistory.location.pathname;
      expect(favoritesPage).toStrictEqual('/favorites');
    });
});
