// Requisito 5
// Referência: https://github.com/tryber/sd-013-a-project-react-testing-library/pull/40/files

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(h2).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon quando o botão Próximo é clicado.', () => {
    renderWithRouter(<App />);

    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button); // testando o click do botão.
  });

  test('Testa se é mostrado um pokemon a cada vez', () => {
    renderWithRouter(<App />);

    const buttonFilterAll = screen.getByRole('button', { name: /All/i });
    expect(buttonFilterAll).toBeInTheDocument();
    userEvent.click(buttonFilterAll); // testando o clique do botao
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filterButtons = screen.getAllByTestId('pokemon-type-button'); // Recuperando o elemento pelo data-testid
    expect(filterButtons[0]).toBeInTheDocument();
    userEvent.click(filterButtons[0]); // testando os botoes
    expect(filterButtons[0].innerHTML).toBe('Electric');
  });
});
