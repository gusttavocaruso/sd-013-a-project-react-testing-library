import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Verifica o component About', () => {
  it('Verifica se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const H2_ABOUT = screen.getByText(/About Pokédex/i);
    expect(H2_ABOUT).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const aboutParagraph1 = /This application simulates a Pokédex/i;
    const aboutParagraph2 = /One can filter Pokémons by type/i;
    const readTheElement1 = screen.getByText(aboutParagraph1);
    const readTheElement2 = screen.getByText(aboutParagraph2);
    expect(readTheElement1).toBeInTheDocument();
    expect(readTheElement2).toBeInTheDocument();
  });

  it('Verifica se a página contém a imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('alt', 'Pokédex');
  });
});
