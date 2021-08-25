import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('requirement 1', () => {
  it('should test the text of the links', () => {
    renderWithRouter(<App />);
    const homeLink = screen.queryByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.queryByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    const favoriteLink = screen.queryByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
  });

  it('should test the home link redirect', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.queryByRole('link', { name: 'Home' });
    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('should test the about link redirect', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.queryByRole('link', { name: 'About' });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('should test the favorite pokémons link redirect', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.queryByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('should test the 404 page', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/cafe');
    const errorMsg = 'Page requested not found';
    const elMsg = screen.queryByText(errorMsg);
    expect(elMsg).toBeInTheDocument();
  });
});
