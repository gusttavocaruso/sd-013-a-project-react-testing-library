import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import RenderWithRouter from './RenderWithRouter';

describe('Testa o componente NotFound', () => {
  test('Testa se NotFound tem um heading h2 com o texto específico', () => {
    RenderWithRouter(<NotFound />);

    const getHeading = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(getHeading).toBeInTheDocument();
  });

  test('Testa se a página contém uma imagem', () => {
    RenderWithRouter(<NotFound />);

    const getGif = screen.getAllByRole('img');
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(getGif[1].src).toBe(src);
  });
});
