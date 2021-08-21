import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const aboutHead = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(aboutHead).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const p1 = /This application simulates a Pokédex, a digital encyclopedia containing/i;
    const p2 = /One can filter Pokémons by type, and see more details for each one of/i;

    const paragraph1 = screen.getByText(p1);
    const paragraph2 = screen.getByText(p2);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('Teste se a página contém uma imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);

    const img = screen.getByRole('img');
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    // source https://stackoverflow.com/a/61899027/16722994
    expect(img).toHaveAttribute('src', imgUrl);
  });
});
