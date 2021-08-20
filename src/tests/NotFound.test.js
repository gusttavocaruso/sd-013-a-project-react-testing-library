import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente NotFound', () => {
  test('Verifica se há uma frase para quando a página não é encontrada', () => {
    renderWithRouter(<NotFound />);
    const msg = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(msg).toBeInTheDocument();
  });

  test('Verifica se há um gif na página', () => {
    renderWithRouter(<NotFound />);
    const msg = 'Pikachu crying because the page requested was not found';
    const urlGif = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const gif = screen.getByAltText(msg);
    expect(gif.src).toEqual(urlGif);
  });
});
