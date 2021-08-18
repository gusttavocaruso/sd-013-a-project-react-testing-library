import React from 'react';
import { screen, render } from '@testing-library/react';
import { About } from '../components';

describe('About.js Tests', () => {
  test('test if the page contains a heading h2 with the text Avout Pokédex', () => {
    // Acess screen elements
    render(<About />);
    const titleH2 = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(titleH2).toBeInTheDocument();
  });

  test('test if the page contains two paragraphs with text about a pokedex', () => {
    render(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex/);
    const p2 = screen.getByText(/One can filter Pokémons by type/);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  test('test if the page contains an image with the adress urlImg', () => {
    render(<About />);
    const urlImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img');
    expect(image.src).toStrictEqual(urlImg);
  });
});
