import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from '../components';

describe('Requisito 4: Teste o componente <NotFound.js />', () => { // descrição do teste
  test('4.1 - Teste se página contém um h2 com o texto Page requested not found', () => { // teste do requisito 4
    // acessar os elementos da tela
    render(
      <BrowserRouter>
        {/* renderiza o componente NotFound */}
        <NotFound />
      </BrowserRouter>,
    );
    // verifica se mostra na tela um h2 com o texto
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
    // verifica se mostra na tela a imagem do pikachu chorando
    const imgGif = screen.getByRole('img', { name: /pikachu crying because/i });
    expect(imgGif.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
