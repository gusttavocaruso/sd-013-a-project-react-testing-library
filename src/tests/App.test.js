// npx stryker run ./stryker/PokemonDetails.conf.json para confirmar que os testes foram realizados em 100%

import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 01 - Teste do componente .js', () => {
  describe('Testando se a aplicação possui determinados links de navegação.', () => {
    test('O primeiro link deve possuir o texto Home', () => {
      // Como a função render normal da RTL não dá suporte ao router precisamos usar a função renderWithRouter. Ela pode ser muito útil e usa o createMemoryHistory para embutir no seu componente renderizado a lógica de histórico de navegação , para uso nos teste.
      renderWithRouter(<App />);
      // getByRole: Isso pode ser usado para consultar todos os elementos expostos na árvore de acessibilidade
      // Com a name opção, você pode filtrar os elementos retornados por seus nomes acessíveis
      // Ou seja, usando o screen verificamos se na tela, possui um "link" com o name "home", se tiver guarda ele na variável home.
      const home = screen.getByRole('link', { name: /home/i });
      // Testo se o conteúdo da variável home está no documento
      expect(home).toBeInTheDocument();
    });


  });
});