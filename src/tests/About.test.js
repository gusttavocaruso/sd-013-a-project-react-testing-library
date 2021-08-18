import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente About.js', () => {
  beforeEach(() => renderWithRouter(<About />));

  it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    const heading = screen.getByRole('heading', {
      name: /About Pokédex/i,
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/About Pokédex/i);
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const paragraphs = screen.getAllByText(/Pokémons/i);
    expect(paragraphs.length).toEqual(2);

    const firstParagraph = 'This application simulates a Pokédex, a';
    const secondParagraph = 'One can filter Pokémons by type, and see more details';
    expect(paragraphs[0]).toHaveTextContent(firstParagraph);
    expect(paragraphs[1]).toHaveTextContent(secondParagraph);
  });

  it('Teste se a página contém a imagem específica de uma Pokédex.', () => {
    const image = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image).toHaveAttribute('src', src);
  });
});
