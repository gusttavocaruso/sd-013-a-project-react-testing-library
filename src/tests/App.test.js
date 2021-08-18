import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Test App.js', () => {
  it('should contain links to `Home`, `About` and `Favorite Pokémons`', () => {
    renderWithRouter(<App />);
    const links = screen.getAllByRole('link');
    const NUMBER_OF_LINKS = 4;
    expect(links.length).toBe(NUMBER_OF_LINKS);

    const LINKS_VALUES = ['Home', 'About', 'Favorite Pokémons', 'More details'];
    links.forEach((link, idx) => {
      expect(LINKS_VALUES.includes(link.textContent)).toBe(true);
      expect(links[idx].textContent).toBe(LINKS_VALUES[idx]);
    });
  });

  it('should redirect to `/` when clicking `Home`', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/^Home$/));
    const path = history.location.pathname;
    expect(path).toBe('/');
    const heading = screen.getByText(/^Encountered pokémons$/);
    expect(heading).toBeInTheDocument();
  });

  it('should redirect to `/about` when clicking `About`', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/^About$/));
    const path = history.location.pathname;
    expect(path).toBe('/about');
    const heading = screen.getByText(/^About Pokédex$/);
    expect(heading).toBeInTheDocument();
  });

  it('should redirect to `/favorites` when clicking `Favorite Pokémons`', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/^Favorite Pokémons$/));
    const path = history.location.pathname;
    expect(path).toBe('/favorites');
    const heading = screen.getByText(/^Favorite Pokémons$/);
    expect(heading).toBeInTheDocument();
  });
});
