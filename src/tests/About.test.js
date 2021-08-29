import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
  // acessar os elementos da tela
  render(<About />);
  // interagir se precisar
  const homeText = screen.getByText('About Pokemon');
  // fazer seu teste
  expect(homeText).toBeInTheDocument();
  expect(homeText.type).toBe();
});
