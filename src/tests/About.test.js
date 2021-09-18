import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import About from '../components/About';

describe('Verifica se a página contém as informações sobre a Pokédex.', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  it('Se na aplicação há um h2 com o texto de About Pokédex', () => {
    const h2 = screen.getByText('About Pokédex');
    expect(h2).toBeInTheDocument();
  });

  it('Se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const ps = screen.getAllByText(/pokémons/i);
    expect(ps).toHaveLength(2);
  });

  it('Se a página contém a imagem.', () => {
    const img = screen.getByRole('img').src;
    expect(img).toStrictEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
