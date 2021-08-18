import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('Teste o componente NotFound.js', () => {
  it('Teste se página contém um heading h2', () => {
    renderWithRouter(<NotFound />);

    const h2 = screen.getByRole('heading', {
      name: /Page requested not found/,
      level: 2,
    });

    expect(h2).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByAltText(/Pikachu crying because the page requested was not/);
    const src = img.src === 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(src).toBeTruthy();
  });
});
