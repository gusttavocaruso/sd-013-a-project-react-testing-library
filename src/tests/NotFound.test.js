import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('se página contém um heading h2 com o texto Page requested not found 😭;', () => {
    render(
      <NotFound />,
    );

    const h2Text = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(h2Text).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <NotFound />
      </Router>,
    );

    history.push('/pagina/nops');

    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imagem = screen.getByRole('img', {
      name: /Pikachu crying/i,
    });
    expect(imagem.src).toBe(url);
  });
});
