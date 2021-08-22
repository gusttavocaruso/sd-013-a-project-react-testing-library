import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components';

describe('Testa o componente About.js', () => {
  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const aboutText = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutText).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    userEvent.click(screen.getByRole('link', { name: 'About' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const text1 = /This application simulates a Pokédex, a digital encyclopedia/i;
    const text2 = /One can filter Pokémons by type, and see more details for each one/i;
    const aboutText1 = screen.getByTestId('first-p-text');
    const aboutText2 = screen.getByTestId('second-p-text');
    expect(aboutText1).toHaveTextContent(text1);
    expect(aboutText2).toHaveTextContent(text2);
  });
  test('Testa se a página contém a imagem de uma pokédex', () => {
    renderWithRouter(<About />);
    const imageAltText = screen.getByRole('img');
    expect(imageAltText.src)
      .toStrictEqual('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
