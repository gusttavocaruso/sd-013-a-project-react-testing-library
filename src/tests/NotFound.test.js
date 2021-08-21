import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../components/helper/renderWithRouter';

describe('Teste o componente NotFound', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /requested not found/i,
    });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    const { history } = renderWithRouter(<NotFound />);
    history.push('/pagina/que-nao-existe/');

    const urlImg = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imagemNotFound = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(imagemNotFound.src).toBe(urlImg);
  });
});
