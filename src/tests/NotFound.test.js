import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import RenderWithRouter from './renderWithRouter';

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

// feito com consulta ao repositório : https://github.com/tryber/sd-013-a-project-react-testing-library/blob/f38b7d9fd1a21c803077a1221844aeb6051f49dd/src/tests/NotFound.test.js
