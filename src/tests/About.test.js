import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

afterEach(cleanup);

describe('About.js` Tests', () => {
  it('Checks if it cotains a heading level 2 with text "About Pokédex"', () => {
    renderWithRouter(<About />);
    const Text = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(Text).toBeInTheDocument();
  });

  it('Checks if there are two paragraphs about the Pokédex', () => {
    renderWithRouter(<About />);
    const firstP = /This application simulates a Pokédex, a digital encyclopedia/i;
    const secondP = /One can filter Pokémons by type, and see more details for each one/i;
    const pOne = screen.getByText(firstP);
    expect(pOne).toBeInTheDocument();
    const pTwo = screen.getByText(secondP);
    expect(pTwo).toBeInTheDocument();
  });

  it('Checks if there are a specific image on the screen', () => {
    renderWithRouter(<About />);
    const alt = screen.getByAltText('Pokédex');
    const src = alt.src.includes('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(src).toBeTruthy();
  });
});
