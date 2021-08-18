import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test(
    'Contém um heading h2 com o texto Page requested not found 😭',
    () => {
      renderWithRouter(<NotFound />);
      const h2NotFound = screen.getByRole('heading', {
        name: /Page requested not found/i,
        level: 2,
      });
      expect(h2NotFound).toBeInTheDocument();
    },
  );

  test(
    'Mostrar a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      renderWithRouter(<NotFound />);
      const img = screen.getByAltText(
        'Pikachu crying because the page requested was not found',
      );
      expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    },
  );
});
