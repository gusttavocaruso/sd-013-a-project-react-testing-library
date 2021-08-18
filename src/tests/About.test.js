import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

afterEach(cleanup);

describe('Tests for About.js', () => {
  it('Check if page contains H2 with text "About Pokédex"', () => {
    renderWithRouter(<About />);

    const h2 = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('Check if page contains two p elements with info about pokédex"', () => {
    renderWithRouter(<About />);

    const p1Msg = /This application simulates a Pokédex, a digital encyclopedia/i;
    const p2Msg = /One can filter Pokémons by type, and see more details for each one/i;

    const p1 = screen.getByText(p1Msg);
    expect(p1).toBeInTheDocument();
    const p2 = screen.getByText(p2Msg);
    expect(p2).toBeInTheDocument();
  });

  it('Check if page contains specific image', () => {
    renderWithRouter(<About />);

    const img = screen.getByAltText('Pokédex');
    const src = img.src.includes('Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(src).toBeTruthy();
  });
});
