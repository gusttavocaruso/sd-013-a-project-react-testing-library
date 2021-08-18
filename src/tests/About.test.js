import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <App.js />', () => {
  it('will test if the page have a heading with the text "About Pokédex"', () => {
    render(<About />);

    const headingAbout = screen.getByRole('heading', {
      name: 'About Pokédex',
    });
    expect(headingAbout).toBeInTheDocument();
  });

  it('will test if the page have two paragraph with the text about pokedex', () => {
    render(<About />);

    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  it('will test if the page have a image from a pokedex', () => {
    render(<About />);

    const imagePokedex = screen.getByAltText('Pokédex')
      .src.includes('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(imagePokedex).toBeTruthy();
  });
});
