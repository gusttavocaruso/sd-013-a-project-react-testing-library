import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requsito 4 - Verificando o componente <NotFound />', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });

  it('Verifica se existe um "h2" com o texto: "Page requested not found 😭"', () => {
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('Page requested not found 😭');
  });

  it('Verifica se existe a imagem do Pikachu chorando ', () => {
    const pikaCry = screen.getAllByRole('img')[1];
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(pikaCry).toBeInTheDocument();
    expect(pikaCry.src).toContain(src);
  });
});
