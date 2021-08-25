import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from './RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Requsito-4 - Teste do componente <NotFound />', () => {
  beforeEach(() => {
    RenderWithRouter(<NotFound />);
  });

  test('Testa se a página contém "h2" com o texto: "Page requested not found 😭"', () => {
    const h2 = screen.getByRole('heading', { level: 2 }); // Role da tag <h2> é heading
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('Page requested not found 😭');
  });

  test('Testa se a página contém uma imagem com o link específico', () => {
    const image = screen.getAllByRole('img')[1];
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(src);
  }); // Resolução baseada no projeto do Matheus Duarte e do Andre Lorenzoni.
});
