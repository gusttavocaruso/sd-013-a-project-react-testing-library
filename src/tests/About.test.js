import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente About.js', () => {
  it('Deve conter um h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);

    const h2Text = screen.getByRole('heading', { name: /about pokédex/i });

    expect(h2Text).toBeInTheDocument();
  });

  it('Deve conter dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);

    const paragraph1 = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia/i,
    );
    const paragraph2 = screen.getByText(
      /One can filter Pokémons by type, and see more details/i,
    );

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('Deve conter a imagem de uma pokédex', () => {
    renderWithRouter(<App />);

    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);

    const pokeDexImg = screen.getByRole('img', { name: /pokédex/i });

    expect(pokeDexImg.src).toBe(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
