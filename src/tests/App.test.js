import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Test App component', () => {
  const favoritePokesText = 'Favorite Pokémons';

  it('Renders navigation links', () => {
    renderWithRouter(<App />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toBeInTheDocument();
    expect(links[0]).toHaveTextContent('Home');

    expect(links[1]).toBeInTheDocument();
    expect(links[1]).toHaveTextContent('About');

    expect(links[2]).toBeInTheDocument();
    expect(links[2]).toHaveTextContent(favoritePokesText);
  });

  it('Redirects to "/" when "Home" link is clicked ', () => {
    const { history } = renderWithRouter(<App />);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const homeLink = screen.getByRole('link', { name: 'Home' });
    userEvent.click(homeLink);

    expect(pathname).toBe('/');
  });

  it('Redirects to "/about" when "About" link is clicked', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toHaveTextContent('About');
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Redirects to "/favorites" when "Favorite Pokemon" link is clicked', () => {
    const { history } = renderWithRouter(<App />);

    const favPokesLink = screen.getByRole('link', { name: favoritePokesText });
    expect(favPokesLink).toHaveTextContent(favoritePokesText);
    userEvent.click(favPokesLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Redirects to "NotFound" when URL path does not exist', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau');
    const notFoundText = screen.getByRole('heading', { level: 2 });
    expect(notFoundText).toBeInTheDocument();
    expect(notFoundText).toHaveTextContent('Page requested not found 😭');
  });
});
