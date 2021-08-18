import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('1 - Test if the application top have a set link sets in the navigation', () => {
  it('The if the first link must have a text Home', () => {
    renderWithRouter(<App />);
    const homeText = screen.getByText('Home');
    expect(homeText).toBeInTheDocument();
  });
  it('Test if the second link must have the text About', () => {
    renderWithRouter(<App />);
    const aboutText = screen.getByText('About');
    expect(aboutText).toBeInTheDocument();
  });
  it('Test if the third link must have the text Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const favText = screen.getByText('Favorite Pokémons');
    expect(favText).toBeInTheDocument();
  });
});

describe('2 - Check the routes', () => {
  it('Test if the application is redirected to the main page', () => {
    const { history: { location: { pathname } } } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);
    const patHome = pathname;
    const homeText = screen.getByRole('heading', {
      name: /Pokédex/i,
      level: 1,
    });
    expect(patHome).toBe('/');
    expect(homeText).toBeInTheDocument();
  });

  it('Test if the application is redirected to the About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);
    const { location: { pathname } } = history;
    const pathAbout = pathname;
    const aboutText = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(pathAbout).toBe('/about');
    expect(aboutText).toBeInTheDocument();
  });

  it('Test if the application is redirected to the Favorites', () => {
    const { history } = renderWithRouter(<App />);
    const favLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });

    userEvent.click(favLink);
    const { location: { pathname } } = history;
    const pathFav = pathname;

    const favText = screen.getByRole('heading', {
      name: /favorite pokémons/i,
      level: 2,
    });

    expect(pathFav).toBe('/favorites');
    expect(favText).toBeInTheDocument();
  });

  it('Test if the page is redirected to the unknown page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/unknown-page');

    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(notFoundText).toBeInTheDocument();
  });
});
