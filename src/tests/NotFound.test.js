import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from '../components';

describe('Requisito 3: Teste o componente <NotFound.js />', () => { // descrição do teste
  test('4.1 - Teste se página contém um h2 com o texto Page requested not found', () => { // teste do requisito 1
    // acessar os elementos da tela
    render(
      <BrowserRouter>
        {/* renderiza o componente NotFound */}
        <NotFound />
      </BrowserRouter>,
    );
    const h2 = screen.getByText('page requested not found', { exact: false });
    expect(h2).toBeInTheDocument();
  });

  test('4.2 - Teste se página mostra a imagem', () => {
    render(
      <BrowserRouter>
        {/* renderiza o componente NotFound */}
        <NotFound />
      </BrowserRouter>,
    );
    const imgGif = screen.getByRole('img', { name: /Pikachu crying because/i });
    expect(imgGif.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
