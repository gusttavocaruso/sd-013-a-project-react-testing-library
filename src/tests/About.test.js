import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Teste o componente <About.js />.', () => {
  it('A página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const h2 = screen.queryByText(/About Pokédex/i);
    expect(h2).toBeInTheDocument();
    expect(h2).toContainHTML('</h2>');
  });
  it('A página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const h2 = screen.queryAllByText(/Pokédex/i);
    h2.forEach((img) => expect(img).toBeInTheDocument());
    expect(h2.length).toBe(2);
  });
  it('A página contém a seguinte imagem de uma Pokédex.', () => {
    render(<About />);
    const h2 = screen.queryAllByRole('img');
    h2.forEach((img) => expect(img).toBeInTheDocument());
    h2.find((tag) => expect(tag).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'));
  });
});
