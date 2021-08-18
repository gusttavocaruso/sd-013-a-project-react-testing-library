import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Tests for App.js', () => {
  it('Check if there is a navbar with links', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home).toBeInTheDocument();
    const about = screen.getByRole('link', { name: 'About' });
    expect(about).toBeInTheDocument();
    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favorite).toBeInTheDocument();
  });

  it('Check if application redirects to "/" when user clicks link', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'Home' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Check if application redirects to "/about" when user clicks link', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'About' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Check if application redirects to "/favorites" when user clicks link', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Check if application redirects to NotFound page when wrong url is used', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/picanha');
    const { pathname } = history.location;
    expect(pathname).toBe('/picanha');
    const msg = 'Pikachu crying because the page requested was not found';
    const notFoundMsg = screen.getByAltText(msg);
    expect(notFoundMsg).toBeInTheDocument();
  });
});
