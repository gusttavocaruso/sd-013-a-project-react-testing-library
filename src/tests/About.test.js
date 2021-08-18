import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Testes do componente <About />', () => {
  it('Verifica se a página possui um <h2/>', () => {
    render(<About />);
    const headingText = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(headingText).toBeInTheDocument();
  });

  it('Verifica se página possui duas <p/>', () => {
    render(<About />);
    const paragraphText = screen.getByText(/This application simulates/i);
    expect(paragraphText).toBeInTheDocument();
    const paragraphText2 = screen.getByText(/One can filter Pokémons/i);
    expect(paragraphText2).toBeInTheDocument();
  });

  it('Verifica se a página possui a imagem de uma Pokédex', () => {
    render(<About />);
    const image = screen.getByRole('img');
    // Usei .toHaveAttribute inspirado no código do colega Victor Diniz;
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
