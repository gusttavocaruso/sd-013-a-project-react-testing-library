import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa About.js.', () => {
  test('A página deve conter um heading h2 com o texto About Pokédex.', () => {
    render(<About />);
    const aboutPokedex = screen.getByRole('heading', {
      name: /About Pokédex/i,
      level: 2,
    });
    expect(aboutPokedex).toBeInTheDocument();
  });

  test('A página deve conter 2 parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const paragraphOne = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragraphOne).toBeInTheDocument();
    const paragraphTwo = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraphTwo).toBeInTheDocument();
  });

  test('A página deve conter a seguinte imagem de uma Pokédex:', () => {
    render(<About />);
    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex).toBeInTheDocument();
    expect(imgPokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
