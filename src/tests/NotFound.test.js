import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o arquivo NotFound.', () => {
  test('Testa se existe um heading na página', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/FakeCupcake');
    const getHeadingNF = screen.getByRole('heading', { name: /requested not found/i });
    expect(getHeadingNF).toBeInTheDocument();
  });
  test('Testa se a NotFound exibe uma determinada imagem.', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/FakeCupcake');
    const getImage = screen.getByAltText(/the page requested was not found/i);
    const imageLink = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(getImage.src).toStrictEqual(imageLink);
  });
});
