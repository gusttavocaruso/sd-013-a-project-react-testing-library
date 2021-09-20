import React from 'react';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

// Recebe um componente por parâmetro, e renderiza este componente com a rota e o histórico daquela rota. Você pode ver um pouco mais sobre ela nos conteúdos do dia 15.2
const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{ component }</Router>), history,
  });
};

export default renderWithRouter;