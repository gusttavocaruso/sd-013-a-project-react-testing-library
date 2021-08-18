import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testando a página Sobre', () => {
  it('A página deve conter um h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(aboutPokedex).toBeInTheDocument();
  });

  it('A página deve conter dois parágrafos de texto', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  it('A página de conter uma imagem com a url especificada', () => {
    renderWithRouter(<About />);

    const getImg = screen.getByRole('img');
    expect(getImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
