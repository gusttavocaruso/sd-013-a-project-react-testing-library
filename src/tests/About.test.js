import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';

import App from '../App';

describe('Testing \'about\' component', () => {
  it('should have a title about \'pokedex\'', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const aboutTitle = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(aboutTitle).toBeInTheDocument();
  });

  it('should have informations about \'pokedex\'', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const firstText = screen.getByText(/this application simulates a pokédex/i);
    const secondText = screen.getByText(/one can filter pokémons by type/i);

    expect(firstText).toBeInTheDocument();
    expect(secondText).toBeInTheDocument();
  });

  it('should have an image in \'about\' component', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    const imageAbout = screen.getByRole('img', { name: /pokédex/i });

    expect(imageAbout.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
