import React from 'react';
import { screen, render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import renderWithRouter from '../helper/renderWithRouter';
import About from '../components/About';

describe('Teste o componente About', () => {
  it('Teste do h2', () => {
    render(<About />);
    const title = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(title).toBeInTheDocument();
  });
  it('Teste dos parágrafos', () => {
    render(<About />);
    const p1Msg = /This application simulates a Pokédex, a digital encyclopedia /i;
    const p2Msg = /One can filter Pokémons by type, and see more details/i;
    const fistParagraph = screen.getByText(p1Msg);
    const secondParagraph = screen.getByText(p2Msg);
    expect(fistParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('Teste a imagem', () => {
    render(<About />);
    const image = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(src);
  });
});
