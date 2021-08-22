import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import { NotFound } from '../components';

describe('Testa a Página Not Found', () => {
  test('Contém h2 dizendo que a pagina não é encontrada', () => {
    renderWithRouter(<NotFound />);

    const h2NotFound = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(h2NotFound).toBeInTheDocument();
  });
  test('testa se existe img do pokemon chorado not found', () => {
    renderWithRouter(<NotFound />);

    const imgPokeTriste = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found' });
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imgPokeTriste.src).toBe(src);
  });
});
