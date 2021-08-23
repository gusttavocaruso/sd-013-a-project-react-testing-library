import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa as propiedades do about.', () => {
  test('Verifica que existe uma URL About.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/about');
    const headingAbout = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(headingAbout).toBeInTheDocument();
  });
  test('Verifica se existem dois parágrafos na página about.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/about');
    const firstParagraph = screen.getByText(
      /this application simulates a pokédex/i,
    );
    const secParagraph = screen.getByText(
      /one can filter pokémons/i,
    );
    expect(firstParagraph).toBeInTheDocument();
    expect(secParagraph).toBeInTheDocument();
  });
  test('Verifica se existe uma imagem na página About', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/about');
    const imagePath = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imagePokedex = screen.getByRole('img');

    expect(imagePokedex.src).toStrictEqual(imagePath);
  });
});
