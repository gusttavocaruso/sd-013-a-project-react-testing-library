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
    const ParagrafoAbout = screen.getAllByTestId(/custom-paragraph/i);
    expect(ParagrafoAbout).toHaveLength(2);
  });

  it('Verifica se a página contém a seguinte imagem de uma Pokédex:', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('alt', 'Pokédex');
  });
});
